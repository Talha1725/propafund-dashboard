import ComponentContainer from "@/components/common/component-container";
import { SectionHeading } from "@/components/common/section-heading";
import ProfilePicture from "./profile-picture";
import ChangePasswordSection from "./change-password-section";
import TwoFactorAuthenticationSection from "./two-factor-authentication-section";
import ActiveSection from "./active-section";

export default function SecuritySection() {
  const handleImageChange = (imageUrl: string) => {
    // Handle profile image change if needed
    console.log("Profile image changed:", imageUrl);
  };

  return (
    <div className="flex-1 pb-5 md:pb-0">
      {/* Profile Picture Section */}
      <ComponentContainer>
        <SectionHeading title="Profile Picture" />
        <div className="mt-3 sm:mt-4">
          <ProfilePicture onImageChange={handleImageChange} />
        </div>
      </ComponentContainer>

      {/* Change Password Section */}
      <ChangePasswordSection />
      <TwoFactorAuthenticationSection />
      <ActiveSection />
    </div>
  );
}
