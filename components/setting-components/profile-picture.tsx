// Button import removed - using custom button styling
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import avatarImage from "@/public/assets/avatar-2.svg";

interface ProfilePictureProps {
  onImageChange?: (imageUrl: string) => void;
  initialImage?: StaticImageData | string;
  className?: string;
}

export default function ProfilePicture({ 
  onImageChange, 
  initialImage = avatarImage,
  className = ""
}: ProfilePictureProps) {
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(initialImage);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        onImageChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(avatarImage);
    onImageChange?.("");
  };

  return (
    <div className={`flex items-start gap-6 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={profileImage || avatarImage}
            alt="Profile"
            width={85}
            height={85}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="">
            <p className="text-white settings-label">Upload Image</p>
            <p className="text-white/50 text-sm settings-label">Min 400x400px, PNG or JPEG</p>
          </div>
          <div className="flex gap-3">
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => document.getElementById('profile-image')?.click()}
              className="flex items-center justify-center gap-[10px] w-[142px] h-[39px] px-[42px] py-[11px] rounded-[10px] border border-white bg-[#0B0E1233] backdrop-blur-[44px] font-creato-display font-medium text-sm leading-[100%] text-white hover:bg-white/10 transition-colors"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="flex items-center justify-center gap-[10px] w-[142px] h-[39px] px-[42px] py-[11px] rounded-[10px] border border-[#D51B2B] bg-[#0B0E1233] backdrop-blur-[44px] font-creato-display font-medium text-sm leading-[100%] text-[#D51B2B] hover:bg-red-500/10 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
