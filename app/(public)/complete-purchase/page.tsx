"use client";

import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import purchaseBg from "@/public/assets/promo-bg.svg";
import SectionHeader from "@/components/common/section-header";
import SupportForm from "@/components/support/support-form";
import FramedTable from "@/components/common/framed-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { purchaseFields, orderDetails, commonStyles, content } from "../../../constants/purchase";
import PaymentTabs from "@/components/purchase/payment-tabs";
import Glow from "@/components/common/glow";

export default function PurchasePage() {
  const [selectedPayment, setSelectedPayment] = React.useState("crypto");

  return (
    <>
      <HeroSection 
        image={purchaseBg}
        titleLine1={content.hero.titleLine1}
        titleLine2={content.hero.titleLine2}
        subtitle={content.hero.subtitle}
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display pb-30 pt-27 relative overflow-hidden" id="purchase">
        <Container>
          <SectionHeader title="Billing & Order Details" text="Complete your purchase to start your trading journey." />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className={commonStyles.sectionTitle}>
                {content.sections.billing}
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

            <div className="relative space-y-[10px]">
              <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center items-center">
                <Glow width={6000} height={2500} opacity={0.8} blur={100} />
              </div>
              
              <h2 className={commonStyles.sectionTitle}>
                {content.sections.order}
              </h2>
              <FramedTable
                headers={["Parameter", "Value"]}
                rows={orderDetails}
                showHeaders={false}
                specialOrderTotal={true}
              />

              <div>
                <label className={commonStyles.label}>
                  {content.labels.coupon}
                </label>
              </div>
              <Input
                placeholder={content.labels.couponPlaceholder}
                className={commonStyles.input}
              />

              <div>
                <label className={commonStyles.label}>
                  {content.sections.payment}
                </label>
              </div>
              
              <PaymentTabs 
                selectedPayment={selectedPayment} 
                onPaymentChange={setSelectedPayment} 
              />

              <div className={commonStyles.legalText}>
                <p>{content.legal.privacy}</p>
                <p>
                  {content.legal.terms.prefix}
                  <a href="#" className="text-white underline">{content.legal.terms.terms}</a>
                  {content.legal.terms.middle}
                  <a href="#" className="text-white underline">{content.legal.terms.privacy}</a>
                  {content.legal.terms.suffix}
                </p>
              </div>

              <div className="mt-4">
                <Button variant="secondary" className={commonStyles.button}>
                  {content.button}
                </Button>
              </div> 
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
