"use client";

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { paymentApi } from '@/lib/api/endpoints/payment';
import type { PaymentStatusResponse } from '@/types/payment-api';
import Container from '@/components/common/container';
import HeroSection from '@/components/home-page/hero-section';
import SectionHeader from '@/components/common/section-header';
import FramedTable from '@/components/common/framed-table';
import Glow from '@/components/common/glow';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import purchaseBg from '@/public/assets/promo-bg.svg';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // OxaPay returns with trackId in URL
  const urlTrackId = searchParams.get('trackId');
  
  // Get trackId from URL or localStorage
  let trackId = urlTrackId;
  if (!trackId && typeof window !== 'undefined') {
    trackId = localStorage.getItem('trackId');
  }
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkPaymentStatus = useCallback(async () => {
    if (!trackId) {
      setError('No payment tracking ID found');
      setLoading(false);
      return;
    }

    try {
      const response = await paymentApi.getPaymentStatus({ trackId });
      
      if (response.result || response.success) {
        setPaymentStatus(response.result || response.data);
        setLoading(false);
      } else {
        setError('Failed to check payment status');
        setLoading(false);
      }
    } catch (err: unknown) {
      console.error('Payment status check failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to check payment status');
      setLoading(false);
    }
  }, [trackId]);

  useEffect(() => {
    checkPaymentStatus();
  }, [checkPaymentStatus]);

  if (loading) {
    return (
      <>
        <HeroSection 
          image={purchaseBg}
          titleLine1="Payment"
          titleLine2="Processing"
          subtitle="Please wait while we verify your payment..."
          showButton={false}
          isHomepage={false}
        />
        <div className="font-creato-display pb-30 pt-27">
          <Container>
            <div className="flex items-center justify-center py-20">
              <Spinner variant="ring" className="h-8 w-8 text-white" />
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeroSection 
          image={purchaseBg}
          titleLine1="Payment"
          titleLine2="Error"
          subtitle="There was an issue processing your payment."
          showButton={false}
          isHomepage={false}
        />
        <div className="font-creato-display pb-30 pt-27">
          <Container>
            <SectionHeader title="Payment Error" text="We encountered an issue while processing your payment." />
            <div className="mt-10 max-w-md mx-auto text-center">
              <div className="text-red-500 text-6xl mb-6">❌</div>
              <p className="text-white/70 font-creato-display font-normal text-[16px] leading-[1.4] mb-6">{error}</p>
              <Button
                variant="outline"
                className="text-white font-lay-grotesk text-sm hover:opacity-100"
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  checkPaymentStatus();
                }}
              >
                Try Again
              </Button>
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (paymentStatus?.payment && paymentStatus.payment.status === 'Paid') {
    // Payment successful - show thank you page
    const isAccountReady = !!paymentStatus.account;
    
    const paymentDetails = [
      ["Track ID", paymentStatus.payment.trackId],
      ["Status", paymentStatus.payment.status],
      ["Amount", `$${paymentStatus.payment.amount}`]
    ];
    
    return (
      <>
        <HeroSection 
          image={purchaseBg}
          titleLine1="Payment"
          titleLine2="Successful"
          subtitle="Thank you for choosing PropaFund! Your trading account is ready."
          showButton={false}
          isHomepage={false}
        />
        <div className="font-creato-display pb-30 pt-27 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-1/3 left-1/2 -translate-x-1/2">
              <Glow width={1800} height={1200} opacity={0.35} />
            </div>
          </div>
          <Container>
            <SectionHeader 
              title="Payment Confirmed" 
              text={isAccountReady 
                ? "Your trading account has been created and is ready to use. We've sent a confirmation email with all the details."
                : "Your payment has been confirmed! Your trading account is being created and you will receive an email with your credentials shortly."
              } 
            />
            
            <div className="mt-10 max-w-lg mx-auto">
              <div className="mb-8">
                <h2 className="font-romanica font-normal text-[22px] leading-[1] tracking-[0] uppercase text-white mb-6">
                  Payment Details
                </h2>
                <FramedTable
                  headers={["Parameter", "Value"]}
                  rows={paymentDetails}
                  showHeaders={false}
                  showButton={true}
                  buttonText="Go To Accounts"
                  boldText={true}
                  onButtonClick={() => {
                    router.push('/user/accounts');
                  }}
                />
              </div>
              
              <div className="text-center">
                <p className="text-white/70 font-creato-display font-normal text-[14px] leading-[1.4]">
                  If you need assistance, our support team is available 24/7 via Email, Telegram, or Web Ticket.
                </p>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <HeroSection 
        image={purchaseBg}
        titleLine1="Payment"
        titleLine2="Confirmed"
        subtitle="Your payment has been confirmed and your trading account is being created."
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display pb-30 pt-27">
        <Container>
          <SectionHeader 
            title="Account Creation in Progress" 
            text="Your payment has been confirmed and your trading account is being created. You will receive an email with your account details shortly." 
          />
          <div className="mt-10 max-w-md mx-auto text-center">
            <div className="animate-pulse text-blue-500 text-6xl mb-6">⏳</div>
            <Button
              variant="default"
              className="w-full font-lay-grotesk text-sm hover:opacity-80 !h-11 text-black bg-white"
              onClick={() => {
                router.push('/user/dashboard');
              }}
            >
              Go To Dashboard
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <>
        <HeroSection 
          image={purchaseBg}
          titleLine1="Loading"
          titleLine2="..."
          subtitle="Please wait while we load your payment status."
          showButton={false}
          isHomepage={false}
        />
        <div className="font-creato-display pb-30 pt-27">
          <Container>
            <div className="flex items-center justify-center py-20">
              <Spinner variant="ring" className="h-8 w-8 text-white" />
            </div>
          </Container>
        </div>
      </>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}