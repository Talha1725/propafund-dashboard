import ChangePasswordSection from "./change-password-section";
import TwoFactorAuthenticationSection from "./two-factor-authentication-section";

export default function SecuritySection() {
  return (
    <div className="flex-1 pb-5 md:pb-0">
      {/* Change Password Section */}
      <ChangePasswordSection />
      <TwoFactorAuthenticationSection />
    </div>
  );
}
