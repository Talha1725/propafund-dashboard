"use client";

import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import purchaseBg from "@/public/assets/promo-bg.svg";
import SectionHeader from "@/components/common/section-header";
import SupportForm from "@/components/support/support-form";
import FramedTable from "@/components/common/framed-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Glow from "@/components/common/glow";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom, initializeAuthAtom, authInitializedAtom } from "@/lib/store/atoms";
import { purchaseFields } from "@/constants/purchase";
import { getSummaryDetails } from "@/constants/funded";
import { getPaymentMethods } from "@/constants/checkout";
import { usePayment } from "@/hooks/use-payment";
import { paymentApi } from "@/lib/api/endpoints/payment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function PurchasePageContent() {
  const [selectedPayment, setSelectedPayment] = useState("crypto");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const [, initializeAuth] = useAtom(initializeAuthAtom);
  const [authInitialized] = useAtom(authInitializedAtom);

  const challengeType = searchParams.get('challengeType') || 'stage-one';
  const accountType = searchParams.get('accountType') || 'elite-50k';
  const platform = searchParams.get('platform') || 'platform-5';

  const { createPayment, loading } = usePayment();

  const dynamicOrderDetails = useMemo(() => {
    return getSummaryDetails(challengeType, accountType, platform);
  }, [challengeType, accountType, platform]);

  // Generate initial values for the form based on available user data
  const initialValues = useMemo(() => {
    if (!user) {
      return {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
      };
    }
    
    const nameParts = user.fullName?.trim().split(' ') || [];
    
    return {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: user.email || '',
      country: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    };
  }, [user]);

  const [formData, setFormData] = useState<Record<string, string>>(initialValues);

  const [cryptoDiscount, setCryptoDiscount] = useState({
    percentage: 0,
    text: "",
    isActive: false
  });

  // Dynamic payment methods based on discount
  const dynamicPaymentMethods = useMemo(() => {
    return getPaymentMethods(challengeType, accountType, cryptoDiscount.percentage);
  }, [challengeType, accountType, cryptoDiscount.percentage]);

  useEffect(() => {
    if (!authInitialized) {
      initializeAuth();
    }
  }, [authInitialized, initializeAuth]);

  // Fetch crypto discount settings on mount
  useEffect(() => {
    const fetchDiscountSettings = async () => {
      try {
        const response = await paymentApi.getActiveDiscountInfo();
        if (response.success && response.data) {
          setCryptoDiscount({
            percentage: response.data.cryptoDiscountPercent || 0,
            text: response.data.discountText || `${response.data.cryptoDiscountPercent || 0}% off`,
            isActive: response.data.isActive || false
          });
        }
      } catch (error) {
        console.error('Failed to fetch discount settings:', error);
      }
    };

    fetchDiscountSettings();
  }, []);

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please log in to complete your purchase');
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'country', 'streetAddress', 'city', 'state', 'zipCode', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required billing details');
      return;
    }

    if (selectedPayment === 'crypto') {
      // Integrate OxaPay for crypto payments
      try {
        const discountText = cryptoDiscount.isActive ? `${cryptoDiscount.percentage}% discount` : 'no discount';
        toast.success(`Creating crypto payment with ${discountText}...`);

        const checkoutState = {
          selectedFunding: challengeType,
          selectedAccountSize: accountType,
          selectedPlatform: platform,
          selectedPaymentMethod: 'crypto'
        };

        const paymentData = await createPayment(checkoutState, formData, 'crypto', cryptoDiscount.percentage);
        
        if (paymentData && paymentData.oxapay) {
          localStorage.setItem('trackId', paymentData.payment.trackId);
          
          toast.success('Redirecting to OxaPay payment gateway...');
          
          window.location.href = paymentData.oxapay.payment_url;
        } else {
          toast.error('Failed to create payment. Please try again.');
        }
      } catch (error) {
        console.error('Payment creation failed:', error);
        toast.error('Payment creation failed. Please try again.');
      }
    } else {
      toast.info('Credit card payment selected');
    }
  };

  return (
    <>
      <HeroSection 
        image={purchaseBg}
        titleLine1="Complete Your"
        titleLine2="Purchase"
        subtitle="Fill in your details and proceed to secure your trading challenge."
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display pb-30 pt-27 relative overflow-hidden" id="purchase">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2">
            <Glow width={1800} height={1200} opacity={0.35} />
          </div>
        </div>
        <Container>
          <SectionHeader title="Billing & Order Details" text="Complete your purchase to start your trading journey." />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="font-romanica font-normal text-[22px] leading-[1] tracking-[0] uppercase text-white mb-6">
                Billing Details
                {!authInitialized ? (
                  <span className="text-white/50 text-[14px] ml-2">(Loading user data...)</span>
                ) : user ? (
                  <span className="text-white/50 text-[14px] ml-2">(Email & name auto-filled from your account)</span>
                ) : (
                  <span className="text-white/50 text-[14px] ml-2">(Please log in to auto-fill email & name)</span>
                )}
              </h2>
              <SupportForm
                key={user?.id || 'no-user'} // Force re-render when user changes
                fields={purchaseFields}
                showFrame={false}
                showSubmitButton={false}
                initialValues={initialValues}
                onSubmit={async (values) => {
                  setFormData(values);
                }}
                onFieldChange={(fieldName, value) => {
                  setFormData(prev => ({
                    ...prev,
                    [fieldName]: value
                  }));
                }}
              />
            </div>

            <div className="relative space-y-[10px]">
              <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center items-center">
                <Glow width={1200} height={800} opacity={0.4} shape="farthest-side" blur={80} />
              </div>
              
              <h2 className="font-romanica font-normal text-[22px] leading-[1] tracking-[0] uppercase text-white">
                Order Details
              </h2>
              
              <FramedTable
                headers={["Parameter", "Value"]}
                rows={dynamicOrderDetails}
                showHeaders={false}
              />

              <div>
                <label className="font-romanica font-normal text-[18px] leading-[100%] tracking-[0%] uppercase text-white">
                  Have a coupon?
                </label>
              </div>
              
              <Input
                placeholder="Enter your coupon code"
                className="w-full h-[61px] px-5 py-5 font-creato-display font-medium text-[18px] leading-[100%] tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white placeholder:text-white/70 focus:border-white/30 focus:outline-none"
              />

              <div>
                <label className="font-romanica font-normal text-[18px] leading-[100%] tracking-[0%] uppercase text-white">
                  Payment Method
                </label>
              </div>
              
              <Tabs value={selectedPayment} onValueChange={setSelectedPayment} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-transparent border border-white/10">
                  <TabsTrigger 
                    value="crypto" 
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:text-white/70 data-[state=inactive]:bg-transparent border border-white/10"
                  >
                    {cryptoDiscount.isActive ? `Crypto (${cryptoDiscount.percentage}% off)` : 'Crypto'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="credit" 
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:text-white/70 data-[state=inactive]:bg-transparent border border-white/10"
                  >
                    Credit Card
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Show pricing for selected payment method */}
              {dynamicPaymentMethods.length > 0 && (
                <div className="text-white/70 font-creato-display font-normal text-[14px] leading-[1.4] space-y-2">
                  {selectedPayment === 'crypto' && cryptoDiscount.isActive && (
                    <div className="flex items-center gap-2">
                      <span className="text-white/50 line-through">{dynamicPaymentMethods[0].originalPrice}</span>
                      <span className="font-bold text-green-400">{dynamicPaymentMethods[0].discountedPrice}</span>
                      <span className="text-green-400 text-xs">({cryptoDiscount.percentage}% off)</span>
                    </div>
                  )}
                  {selectedPayment === 'credit' && (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{dynamicPaymentMethods[1]?.originalPrice || dynamicPaymentMethods[0]?.originalPrice}</span>
                    </div>
                  )}
                </div>
              )}


              <div className="text-white/70 font-creato-display font-normal text-[14px] leading-[1.4] space-y-2">
                <p>
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </p>
                <p>
                  By proceeding, you agree to our{" "}
                  <a href="#" className="text-blue-400 underline">Terms and Conditions</a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-400 underline">Privacy Policy</a>.
                </p>
              </div>

              <div className="flex justify-center mt-15">
                <Button 
                  variant="secondary" 
                  className="w-[181px] h-[45px] px-[30px] py-[12px] gap-[15px]"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Proceed To Payment'}
                </Button>
              </div> 
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default function PurchasePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchasePageContent />
    </Suspense>
  );
}
