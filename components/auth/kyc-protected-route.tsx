"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { kycApi } from "@/lib/api/endpoints/kyc";
import type { KYCStatusResponse } from "@/types/kyc";
import { AlertTriangle } from "lucide-react";

interface KYCProtectedRouteProps {
  children: React.ReactNode;
}

export default function KYCProtectedRoute({ children }: KYCProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [kycStatus, setKycStatus] = useState<KYCStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKYCStatus();
  }, []);

  const loadKYCStatus = async () => {
    try {
      const status = await kycApi.getStatus();
      setKycStatus(status);
    } catch (error) {
      console.error('Failed to load KYC status:', error);
    } finally {
      setLoading(false);
    }
  };

  // Don't show loading screen, just render children while checking
  // This prevents the black screen with loading text
  if (loading || !kycStatus) {
    return <>{children}</>;
  }

  // Allow access to KYC page itself
  if (pathname === '/user/kyc') {
    return <>{children}</>;
  }

  // Check if KYC is required - redirect if deadline passed and not approved
  // If isExpired is undefined, calculate it based on daysRemaining
  const isExpired = kycStatus.isExpired ?? (kycStatus.daysRemaining !== null && kycStatus.daysRemaining !== undefined && kycStatus.daysRemaining <= 0);
  const kycRequired = isExpired && kycStatus.status !== 'approved';
   
  // Redirect to KYC page if deadline has passed and KYC is not approved
  if (kycRequired) {
    router.push('/user/kyc');
    return null;
  }

  // Allow access for all other cases
  return <>{children}</>;
}

// Component to enforce KYC on specific routes that require approval
interface KYCApprovalRequiredProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

export function KYCApprovalRequired({ 
  children, 
  fallbackMessage = "KYC approval is required to access this feature." 
}: KYCApprovalRequiredProps) {
  const [kycStatus, setKycStatus] = useState<KYCStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const status = await kycApi.getStatus();
        setKycStatus(status);
      } catch (error) {
        console.error('Failed to load KYC status:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, []);

  // Don't show loading, just return null to prevent UI disruption
  if (loading) {
    return null;
  }

  // Only allow access if KYC is approved
  if (kycStatus?.status !== 'approved') {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-orange-500 mb-4">
            <AlertTriangle className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            KYC Verification Required
          </h3>
          <p className="text-gray-400 mb-4">
            {fallbackMessage}
          </p>
          {kycStatus?.status === 'not_submitted' && (
            <button
              onClick={() => router.push('/user/kyc')}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded hover:opacity-90"
            >
              Complete KYC
            </button>
          )}
          {kycStatus?.status === 'pending' && (
            <p className="text-yellow-400">
              Your KYC is under review. Please wait for approval.
            </p>
          )}
          {kycStatus?.status === 'rejected' && (
            <button
              onClick={() => router.push('/user/kyc')}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded hover:opacity-90"
            >
              Resubmit KYC
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

