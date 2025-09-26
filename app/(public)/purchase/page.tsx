"use client";

import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import purchaseBg from "@/public/assets/promo-bg.svg";
import SectionHeader from "@/components/common/section-header";
import SupportForm from "@/components/support/support-form";
import FramedTable from "@/components/common/framed-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Glow from "@/components/common/glow";
import * as React from "react";
import { purchaseFields, orderDetails } from "../../../constants/purchase";

export default function PurchasePage() {
  const [selectedPayment, setSelectedPayment] = React.useState("crypto");

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
            {/* Left Column - Billing Details */}
            <div>
              <h2 className="font-romanica font-normal text-[22px] leading-[1] tracking-[0] uppercase text-white mb-6">
                Billing Details
              </h2>
              <SupportForm
                fields={purchaseFields}
                showFrame={false}
                showSubmitButton={false}
                onSubmit={async (values) => {
                  console.log("Purchase form submitted", values);
                }}
              />
            </div>

            {/* Right Column - Order Details */}
            <div className="relative space-y-[10px]">
              {/* Glow behind the second column */}
              <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center items-center">
                <Glow width={1200} height={800} opacity={0.4} shape="farthest-side" blur={80} />
              </div>
              
              <h2 className="font-romanica font-normal text-[22px] leading-[1] tracking-[0] uppercase text-white">
                Order Details
              </h2>
              
              {/* Order Summary Table */}
              <FramedTable
                headers={["Parameter", "Value"]}
                rows={orderDetails}
                showHeaders={false}
              />

              {/* Coupon Section */}
              <div>
                <label className="font-romanica font-normal text-[18px] leading-[100%] tracking-[0%] uppercase text-white">
                  Have a coupon?
                </label>
              </div>
              
              <Input
                placeholder="Enter your coupon code"
                className="w-full h-[61px] px-5 py-5 font-creato-display font-medium text-[18px] leading-[100%] tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white placeholder:text-white/70 focus:border-white/30 focus:outline-none"
              />

              {/* Payment Method */}
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
                    Crypto
                  </TabsTrigger>
                  <TabsTrigger 
                    value="credit" 
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:text-white/70 data-[state=inactive]:bg-transparent border border-white/10"
                  >
                    Credit Card
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Legal Text */}
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
                <Button variant="secondary" className="w-[181px] h-[45px] px-[30px] py-[12px] gap-[15px]">Proceed To Payment</Button>
              </div> 
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
