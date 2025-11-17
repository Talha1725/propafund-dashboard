export type KYCStatus = 'not_submitted' | 'pending' | 'approved' | 'rejected';

export type IDType = 'drivers_license' | 'passport' | 'government_id';

export interface KYCFormData {
  fullName: string;
  dateOfBirth: string;
  residentialAddress: string;
  city: string;
  country: string;
  postalCode?: string;
  idType: IDType | "";
  frontIdImage?: File;
  backIdImage?: File;
}

export interface KYCData {
  id?: number;
  userId?: number;
  fullName?: string;
  dateOfBirth?: string;
  residentialAddress?: string;
  city?: string;
  country?: string;
  postalCode?: string | null;
  idType?: IDType;
  frontIdImageUrl?: string;
  backIdImageUrl?: string | null;
  status?: KYCStatus;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Complete KYC data for admin use (all fields required)
export interface KYCDataComplete {
  id: number;
  userId: number;
  fullName: string;
  dateOfBirth: string;
  residentialAddress: string;
  city: string;
  country: string;
  postalCode?: string | null;
  idType: IDType;
  frontIdImageUrl: string;
  backIdImageUrl?: string | null;
  status: KYCStatus;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface KYCStatusResponse {
  status: KYCStatus;
  kycDeadline: string | null;
  daysRemaining?: number | null;
  hoursRemaining?: number | null;
  minutesRemaining?: number | null;
  kycData?: KYCData | null;
  canSubmit: boolean;
  isLocked: boolean;
  isExpired?: boolean;
}

export interface KYCSubmissionItem {
  id: number;
  userId: number;
  fullName: string;
  dateOfBirth: string;
  residentialAddress: string;
  city: string;
  country: string;
  postalCode?: string | null;
  idType: IDType;
  frontIdImageUrl: string;
  backIdImageUrl?: string | null;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    userName: string;
    fullName: string;
    kycStatus: KYCStatus;
  };
}

export interface KYCListResponse {
  items: KYCSubmissionItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface KYCUpdateRequest {
  status: 'approved' | 'rejected';
  rejectionReason?: string;
}

