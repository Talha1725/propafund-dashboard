import apiClient from '../client';

// Profile API Types
export interface ProfileData {
  id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  country?: string;
  state?: string;
  town?: string;
  apartment?: string;
  postalCode?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  data: {
    profile: ProfileData;
  };
  message?: string;
}

export interface UpdateProfileData {
  email: string;
  firstName: string;
  lastName: string;
  gender?: 'male' | 'female' | 'other';
  country?: string;
  state?: string;
  apartment?: string;
  town?: string;
  postalCode?: string;
  phone?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  data: {
    profile: ProfileData;
  };
  message?: string;
}

export interface UpdateUsernameResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      userName: string;
    };
  };
  message?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface UploadProfilePictureResponse {
  success: boolean;
  data: {
    imageUrl: string;
  };
  message?: string;
}


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
