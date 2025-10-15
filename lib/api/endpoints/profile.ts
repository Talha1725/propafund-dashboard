import apiClient from '../client';
import type { 
  ProfileResponse, 
  UpdateProfileData, 
  UpdateProfileResponse, 
  UploadProfilePictureResponse, 
  ChangePasswordData, 
  ChangePasswordResponse, 
  UpdateUsernameResponse 
} from '@/types/profile';


export const profile = {
  // Get user profile data
  get: async (email: string): Promise<ProfileResponse> => {
    const response = await apiClient.post('/profile/get', { email });
    return response.data;
  },

  // Update profile information
  update: async (data: UpdateProfileData): Promise<UpdateProfileResponse> => {
    const response = await apiClient.post('/profile/update', data);
    return response.data;
  },

  // Upload profile picture
  uploadProfilePicture: async (file: File): Promise<UploadProfilePictureResponse> => {
    const formData = new FormData();
    formData.append('picture', file);
    const response = await apiClient.post('/profile/upload-profile-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },


  // Change password
  changePassword: async (data: ChangePasswordData): Promise<ChangePasswordResponse> => {
    const response = await apiClient.post('/profile/change-password', data);
    return response.data;
  },

  // Update username
  updateUsername: async (newUsername: string): Promise<UpdateUsernameResponse> => {
    const response = await apiClient.post('/profile/update-username', { newUsername });
    return response.data;
  }
};
