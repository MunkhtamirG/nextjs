import React from "react";
import { ReferralProvider } from "./ReferralContext";

export default function Referral() {
  return (
    <ReferralProvider>
      <div>Referral</div>
    </ReferralProvider>
  );
}
