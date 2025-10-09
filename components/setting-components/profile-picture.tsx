// Button import removed - using custom button styling
import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, setUserAtom } from "@/lib/store/atoms";
import { profile } from "@/lib/api/endpoints/profile";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import avatarImage from "@/public/assets/avatar-2.svg";

interface ProfilePictureProps {
  onImageChange?: (imageUrl: string) => void;
  initialImage?: StaticImageData | string;
  className?: string;
}

export default function ProfilePicture({ 
  onImageChange, 
  initialImage,
  className = ""
}: ProfilePictureProps) {
  const [user, setUser] = useAtom(userAtom);
  const [, setUserState] = useAtom(setUserAtom);
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    initialImage || user?.picture || avatarImage
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Update profile image when user data changes
  useEffect(() => {
    if (user?.picture && user.picture.trim() !== "") {
      setProfileImage(user.picture);  // User's uploaded image
    } else if (initialImage && initialImage !== "" && initialImage !== avatarImage) {
      setProfileImage(initialImage);  // Initial prop image
    } else {
      setProfileImage(avatarImage);   // Default avatar fallback
    }
  }, [user?.picture, initialImage]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type - Please select a PNG, JPEG, or WEBP image");
      event.target.value = '';
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("Image too large - Please select an image smaller than 5MB");
      event.target.value = '';
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileImage(result);  // Show preview before upload
    };
    reader.readAsDataURL(file);

    try {
      // Upload to backend
      const result = await profile.uploadProfilePicture(file);
      if (result.success) {
        const newImageUrl = result.data.imageUrl;
        setProfileImage(newImageUrl);
        onImageChange?.(newImageUrl);
        
        // Update user data in global state
        if (user) {
          setUser({ ...user, picture: newImageUrl });
          localStorage.setItem('user', JSON.stringify({ ...user, picture: newImageUrl }));
        }
        
        toast.success("Profile picture updated successfully");
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload image");
      setProfileImage(user?.picture || avatarImage);
      
      // Type guard for axios error
      const axiosError = error as { response?: { status?: number; data?: string | { message?: string; includes?: (str: string) => boolean } } };
      
      // Check if it's a file size error from server
      if (axiosError.response?.status === 413 || 
          (typeof axiosError.response?.data === 'string' && axiosError.response?.data?.includes?.("File too large"))) {
        toast.error("Image too large - Please select an image smaller than 5MB");
      } else {
        const errorMessage = typeof axiosError.response?.data === 'object' 
          ? axiosError.response?.data?.message 
          : "Failed to upload image. Please try again.";
        toast.error(errorMessage || "Failed to upload image. Please try again.");
      }
    } finally {
      setIsUploading(false);
      // Reset the input after processing
      event.target.value = '';
    }
  };

  // const handleRemoveImage = () => {
  //   // Simply remove the image locally without API call
  //   setProfileImage(avatarImage);
  //   onImageChange?.("");
    
  //   // Update user data in global state
  //   if (user) {
  //     setUser({ ...user, picture: "" });
  //     localStorage.setItem('userData', JSON.stringify({ ...user, picture: "" }));
  //   }
    
  //   toast.success("Profile picture removed successfully");
  // };

  return (
    <div className={`flex items-start gap-6 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="relative w-[85px] h-[85px]">
          <Image
            src={profileImage || avatarImage}
            alt="Profile"
            width={85}
            height={85}
            className="rounded-full object-cover w-[85px] h-[85px]"
            style={{ width: '85px', height: '85px' }}
            unoptimized={typeof profileImage === 'string' && profileImage.startsWith('http')}
            onError={(e) => {
              // Fallback to default avatar if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = avatarImage.src;
            }}
          />
          {/* Loading overlay with spinner */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Spinner 
                variant="ring" 
                className="h-6 w-6 text-white" 
                size={24}
              />
            </div>
          )}
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
              disabled={isUploading}
              className="flex items-center justify-center gap-[10px] w-[142px] h-[39px] px-[42px] py-[11px] rounded-[10px] border border-white bg-[#0B0E1233] backdrop-blur-[44px] font-creato-display font-medium text-sm leading-[100%] text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Spinner variant="default" className="h-4 w-4" size={16} />
                  Uploading...
                </>
              ) : (
                "Change"
              )}
            </button>
            {/* <button
              type="button"
              onClick={handleRemoveImage}
              className="flex items-center justify-center gap-[10px] w-[142px] h-[39px] px-[42px] py-[11px] rounded-[10px] border border-[#D51B2B] bg-[#0B0E1233] backdrop-blur-[44px] font-creato-display font-medium text-sm leading-[100%] text-[#D51B2B] hover:bg-red-500/10 transition-colors"
            >
              Remove
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
