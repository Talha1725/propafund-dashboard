import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ComponentContainer from "@/components/common/component-container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Button import removed - using custom button styling
import downloadIcon from "@/public/assets/save-disk.svg"
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInformationFormSchema, PersonalInformationFormData } from "@/lib/schemas/personal-information";
import ProfilePicture from "@/components/setting-components/profile-picture";
import { profile } from "@/lib/api/endpoints/profile";
import { useAtom } from "jotai";
import { userAtom, setUserAtom } from "@/lib/store/atoms";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function PersonalInformationSection() {
  const [user] = useAtom(userAtom);
  const [, setUser] = useAtom(setUserAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<{
    id?: string;
    email?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    gender?: 'male' | 'female' | 'other';
    phone?: string;
    country?: string;
    state?: string;
    town?: string;
    apartment?: string;
    postalCode?: string;
    profilePicture?: string;
    createdAt?: string;
    updatedAt?: string;
  } | null>(null);
  const [currentUsername, setCurrentUsername] = useState(user?.userName || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<PersonalInformationFormData>({
    resolver: zodResolver(personalInformationFormSchema),
    defaultValues: {
      profile: {
        profileImage: "",
      },
      personal: {
        firstName: "",
        lastName: "",
        gender: undefined,
      },
      contact: {
        contactNumber: "",
        emailAddress: "",
        country: "",
        city: "",
        address: "",
        postalCode: "",
      },
    },
  });

  // Load profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        
        if (!user?.email) {
          throw new Error("User not logged in or email not available");
        }
        
        // Get profile using the user's email from context
        const response = await profile.get(user.email);
        if (response.success && response.data.profile) {
          const data = response.data.profile;
          setProfileData(data);
          
          reset({
            profile: {
              profileImage: data.profilePicture || "",
            },
            personal: {
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              gender: data.gender ? (data.gender as "male" | "female" | "other") : undefined,
            },
            contact: {
              contactNumber: data.phone || "",
              emailAddress: user.email,
              country: data.country || "",
              city: data.town || "",
              address: data.apartment || "",
              postalCode: data.postalCode || "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email && !profileData) {
      fetchProfile();
    }
  }, [user?.email, profileData, reset]);

  const onSubmit = async (data: PersonalInformationFormData) => {
    try {
      // Update username if changed
      if (currentUsername && currentUsername !== user?.userName) {
        const usernameResponse = await profile.updateUsername(currentUsername);
        if (usernameResponse.success && usernameResponse.data?.user && user) {
          // Update user with complete user data
          const updatedUser = {
            ...user,
            userName: usernameResponse.data.user.userName,
          };
          setUser(updatedUser);
          toast.success("Username updated successfully!");
        }
      }

      // Map form data to API format
      const updateData = {
        email: user?.email || "",
        firstName: data.personal.firstName,
        lastName: data.personal.lastName,
        gender: data.personal.gender,
        country: data.contact.country,
        town: data.contact.city,  
        apartment: data.contact.address, 
        postalCode: data.contact.postalCode,
        phone: data.contact.contactNumber,
      };

      const response = await profile.update(updateData);
      
      if (response.success) {
        setProfileData(response.data.profile);
        toast.success("Profile updated successfully!");
      } else {
        throw new Error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleImageChange = (imageUrl: string) => {
    setValue("profile.profileImage", imageUrl);
    
    // Update profile data state
    if (profileData) {
      setProfileData({
        ...profileData,
        profilePicture: imageUrl
      });
    }
  };

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="h-96 flex items-center justify-center">
          <Spinner variant="ring" className="h-12 w-12 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Profile Picture Section */}
        <ComponentContainer>
          <div className="settings-heading text-white text-lg font-normal">Profile Picture</div>
          <div className="mt-3 sm:mt-4">
            <ProfilePicture 
              onImageChange={handleImageChange} 
              initialImage={profileData?.profilePicture || user?.picture || ""}
            />
          </div>
        </ComponentContainer>

        <ComponentContainer className="mt-5 h-fit">
          <div className="settings-heading text-white text-lg font-normal">Personal Information</div>
          <div className="mt-4 h-fit">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName" className="settings-label">First Name</Label>
                <Input
                  {...register("personal.firstName")}
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className="h-10 settings-input"
                />
                {errors.personal?.firstName && (
                  <span className="text-red-400 text-xs">
                    {errors.personal.firstName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName" className="settings-label">Last Name</Label>
                <Input
                  {...register("personal.lastName")}
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className="h-10 settings-input"
                />
                {errors.personal?.lastName && (
                  <span className="text-red-400 text-xs">
                    {errors.personal.lastName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="settings-label">Username</Label>
                <Input
                  type="text"
                  id="username"
                  value={currentUsername}
                  onChange={(e) => setCurrentUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="h-10 settings-input"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="gender" className="settings-label">Gender</Label>
                <Select
                  value={profileData?.gender || ""}
                  onValueChange={(value) => setValue("personal.gender", value as "male" | "female" | "other")}
                >
                  <SelectTrigger className="w-full settings-select-trigger">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                    <SelectContent className="settings-select-content">
                      <SelectItem value="male" className="settings-select-item">Male</SelectItem>
                      <SelectItem value="female" className="settings-select-item">Female</SelectItem>
                      <SelectItem value="other" className="settings-select-item">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.personal?.gender && (
                  <span className="text-red-400 text-xs">
                    {errors.personal.gender.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </ComponentContainer>

        <ComponentContainer className="mt-5">
          <div className="settings-heading text-white text-lg font-normal">Contact Information</div>
          <div className="mt-4 h-fit">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contactNumber" className="settings-label">Contact Number</Label>
                <Input
                  {...register("contact.contactNumber")}
                  type="tel"
                  id="contactNumber"
                  placeholder="Enter your contact number"
                  className="h-10 settings-input"
                />
                {errors.contact?.contactNumber && (
                  <span className="text-red-400 text-xs">
                    {errors.contact.contactNumber.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="emailAddress" className="settings-label">Email Address</Label>
                <Input
                  {...register("contact.emailAddress")}
                  type="email"
                  id="emailAddress"
                  placeholder="Enter your email address"
                  className="h-10 settings-input"
                  readOnly
                  disabled
                />
                <span className="text-white/50 text-xs">Email cannot be changed</span>
                {errors.contact?.emailAddress && (
                  <span className="text-red-400 text-xs">
                    {errors.contact.emailAddress.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="country" className="settings-label">Country of Residence</Label>
                <Select
                  value={profileData?.country || ""}
                  onValueChange={(value) => setValue("contact.country", value)}
                >
                  <SelectTrigger className="w-full settings-select-trigger">
                    <SelectValue placeholder="Select your country">
                      {profileData?.country ? (
                        profileData.country === "united-states" ? "United States" :
                        profileData.country === "canada" ? "Canada" :
                        profileData.country === "united-kingdom" ? "United Kingdom" :
                        profileData.country === "germany" ? "Germany" :
                        profileData.country === "france" ? "France" :
                        profileData.country
                      ) : "Select your country"}
                    </SelectValue>
                  </SelectTrigger>
                    <SelectContent className="settings-select-content">
                      <SelectItem value="united-states" className="settings-select-item">United States</SelectItem>
                      <SelectItem value="canada" className="settings-select-item">Canada</SelectItem>
                      <SelectItem value="united-kingdom" className="settings-select-item">United Kingdom</SelectItem>
                      <SelectItem value="germany" className="settings-select-item">Germany</SelectItem>
                      <SelectItem value="france" className="settings-select-item">France</SelectItem>
                  </SelectContent>
                </Select>
                {errors.contact?.country && (
                  <span className="text-red-400 text-xs">
                    {errors.contact.country.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="city" className="settings-label">City</Label>
                <Select
                  value={profileData?.town || ""}
                  onValueChange={(value) => setValue("contact.city", value)}
                >
                  <SelectTrigger className="w-full settings-select-trigger">
                    <SelectValue placeholder="Select your city">
                      {profileData?.town ? (
                        profileData.town === "new-york" ? "New York" :
                        profileData.town === "los-angeles" ? "Los Angeles" :
                        profileData.town === "chicago" ? "Chicago" :
                        profileData.town === "houston" ? "Houston" :
                        profileData.town === "phoenix" ? "Phoenix" :
                        profileData.town
                      ) : "Select your city"}
                    </SelectValue>
                  </SelectTrigger>
                    <SelectContent className="settings-select-content">
                      <SelectItem value="new-york" className="settings-select-item">New York</SelectItem>
                      <SelectItem value="los-angeles" className="settings-select-item">Los Angeles</SelectItem>
                      <SelectItem value="chicago" className="settings-select-item">Chicago</SelectItem>
                      <SelectItem value="houston" className="settings-select-item">Houston</SelectItem>
                      <SelectItem value="phoenix" className="settings-select-item">Phoenix</SelectItem>
                  </SelectContent>
                </Select>
                {errors.contact?.city && (
                  <span className="text-red-400 text-xs">
                    {errors.contact.city.message}
                  </span>
                )}
              </div>
              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-2 flex-[2]">
                  <Label htmlFor="address" className="settings-label">Address</Label>
                  <Input
                    {...register("contact.address")}
                    type="text"
                    id="address"
                    placeholder="Enter your address"
                    className="h-10 settings-input"
                  />
                  {errors.contact?.address && (
                    <span className="text-red-400 text-xs">
                      {errors.contact.address.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <Label htmlFor="postalCode" className="settings-label">Postal Code</Label>
                  <Input
                    {...register("contact.postalCode")}
                    type="text"
                    id="postalCode"
                    placeholder="Enter your postal code"
                    className="h-10 w-[80%] sm:w-full settings-input"
                  />
                  {errors.contact?.postalCode && (
                    <span className="text-red-400 text-xs">
                      {errors.contact.postalCode.message}
                    </span>
                  )}
                </div>
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
