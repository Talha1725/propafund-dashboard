"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";

export default function PlanSelectionSection() {
  return (
    <div className="font-creato-display py-30">
      <Container>
        <SectionHeader
          title="Choose the Plan That Fits You Best"
          text="Flexible pricing with secure checkout. Customize your plan with optional add-ons for maximum value."
        />
      </Container>
    </div>
  );
}
