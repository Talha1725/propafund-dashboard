"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Frame from "@/components/common/frame";
import { paymentMethods } from "@/constants/purchase";
import { PaymentTabsProps } from "@/types/common";

export default function PaymentTabs({ selectedPayment, onPaymentChange }: PaymentTabsProps) {
  return (
    <Tabs value={selectedPayment} onValueChange={onPaymentChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        {paymentMethods.map((method) => (
          selectedPayment === method.value ? (
            <Frame 
              key={method.value}
              variants="white" 
              topBottomThicknessPx={6} 
              sideThicknessPx={12} 
              className="transition-all duration-300 hover:opacity-80"
            >
              <TabsTrigger value={method.value}>
                {method.label}
              </TabsTrigger>
            </Frame>
          ) : (
            <TabsTrigger key={method.value} value={method.value}>
              {method.label}
            </TabsTrigger>
          )
        ))}
      </TabsList>
    </Tabs>
  );
}
