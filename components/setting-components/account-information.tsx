import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import ComponentContainer from "../common/component-container";
  import { Input } from "../ui/input";
  import { Label } from "../ui/label";
  // Button import removed - using custom button styling
  import downloadIcon from "@/public/assets/save-disk.svg"
  import Image from "next/image";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { accountInformationFormSchema, AccountInformationFormData } from "@/lib/schemas/account-information";
  
  export default function AccountInformationSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<AccountInformationFormData>({
    resolver: zodResolver(accountInformationFormSchema),
    defaultValues: {
      account: {
        username: "",
        country: "",
        timeZone: "",
      },
    },
  });
  
  const onSubmit = async (data: AccountInformationFormData) => {
    try {
      console.log("Form data:", data);
      // Here you would typically send the data to your API
      // await updateAccountInformation(data);
    } catch (error) {
      console.error("Error updating account information:", error);
    }
  };
  
    return (
      <div className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Account Information Section */}
          <ComponentContainer>
            <div className="settings-heading text-white text-lg font-normal">Account Information</div>
            <div className="mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="username" className="settings-label">Username</Label>
                  <Input
                    {...register("account.username")}
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    className="h-10 settings-input"
                  />
                  {errors.account?.username && (
                    <span className="text-red-400 text-sm">
                      {errors.account.username.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="country" className="settings-label">Country of Residence</Label>
                  <Select
                    onValueChange={(value) => setValue("account.country", value)}
                  >
                    <SelectTrigger className="w-full settings-select-trigger">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent className="settings-select-content">
                      <SelectItem value="united-states" className="settings-select-item">United States</SelectItem>
                      <SelectItem value="canada" className="settings-select-item">Canada</SelectItem>
                      <SelectItem value="united-kingdom" className="settings-select-item">United Kingdom</SelectItem>
                      <SelectItem value="germany" className="settings-select-item">Germany</SelectItem>
                      <SelectItem value="france" className="settings-select-item">France</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.account?.country && (
                    <span className="text-red-400 text-sm">
                      {errors.account.country.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="timeZone" className="settings-label">Time Zone</Label>
                  <Select
                    onValueChange={(value) => setValue("account.timeZone", value)}
                  >
                    <SelectTrigger className="w-full settings-select-trigger">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent className="settings-select-content">
                      <SelectItem value="autodetected" className="settings-select-item">Autodetected</SelectItem>
                      <SelectItem value="utc" className="settings-select-item">UTC</SelectItem>
                      <SelectItem value="est" className="settings-select-item">Eastern Time (EST)</SelectItem>
                      <SelectItem value="pst" className="settings-select-item">Pacific Time (PST)</SelectItem>
                      <SelectItem value="cst" className="settings-select-item">Central Time (CST)</SelectItem>
                      <SelectItem value="mst" className="settings-select-item">Mountain Time (MST)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.account?.timeZone && (
                    <span className="text-red-400 text-sm">
                      {errors.account.timeZone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </ComponentContainer>
          
          <button 
            type="submit"
            className="my-5 flex items-center justify-center gap-[10px] w-fit min-w-[180px] h-[39px] px-[42px] py-[11px] rounded-[10px] border border-white bg-[#0B0E1233] backdrop-blur-[44px] font-creato-display font-medium text-sm leading-[100%] text-white disabled:opacity-50 whitespace-nowrap cursor-pointer"
            disabled={isSubmitting}
          >
            <Image className="w-4 h-4" src={downloadIcon} alt="download-icon" />
            <span>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </span>
          </button>
        </form>
      </div>
    );
  }
  