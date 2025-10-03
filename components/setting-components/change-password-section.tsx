import ComponentContainer from "@/components/common/component-container";
import { Label } from "@/components/ui/label";
// Button import removed - using custom button styling
import { PasswordInput } from "@/components/ui/password-input";
import downloadIcon from "@/public/assets/save-disk.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordChangeSchema,
  PasswordChangeData,
} from "@/lib/schemas/security";
import PasswordStrengthIndicator from "@/components/setting-components/password-strength-indicator";

export default function ChangePasswordSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PasswordChangeData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: PasswordChangeData) => {
    try {
      console.log("Security data:", data);
      // Here you would typically send the data to your API
      // await updateSecuritySettings(data);
    } catch (error) {
      console.error("Error updating security settings:", error);
    }
  };

  return (
    <ComponentContainer className="mt-5">
          <div className="settings-heading text-white text-lg font-normal">Change Password</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {/* Current Password */}
          <div className="flex flex-col gap-2">
                <Label htmlFor="currentPassword" className="settings-label">Current Password</Label>
            <PasswordInput
              {...register("currentPassword")}
              id="currentPassword"
              placeholder="• • • • • • • • • • "
              className="h-10 settings-input"
            />
            {errors.currentPassword && (
              <span className="text-red-400 text-sm">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2">
                <Label htmlFor="newPassword" className="settings-label">New Password</Label>
            <PasswordInput
              {...register("newPassword")}
              id="newPassword"
              placeholder="• • • • • • • • • • "
              className="h-10 settings-input"
            />
            {errors.newPassword && (
              <span className="text-red-400 text-sm">
                {errors.newPassword.message}
              </span>
            )}

            {/* Password Strength Indicator */}
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword" className="settings-label">Confirm New Password</Label>
            <PasswordInput
              {...register("confirmPassword")}
              id="confirmPassword"
              placeholder="• • • • • • • • • • "
              className="h-10 settings-input"
            />
            {errors.confirmPassword && (
              <span className="text-red-400 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="mt-3">
            <PasswordStrengthIndicator password={newPassword} />
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 md:mt-2 flex items-center justify-center gap-[10px] w-fit min-w-[180px] h-[39px] px-[42px] py-[11px] rounded-[10px] border border-white bg-[#0B0E1233] backdrop-blur-[44px] font-creato-display font-medium text-sm leading-[100%] text-white disabled:opacity-50 whitespace-nowrap cursor-pointer"
          disabled={isSubmitting}
        >
          <Image className="w-4 h-4" src={downloadIcon} alt="download-icon" />
          <span>
            {isSubmitting ? "Saving..." : "Save"}
          </span>
        </button>
      </form>
    </ComponentContainer>
  );
}
