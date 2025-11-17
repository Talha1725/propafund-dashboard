"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { kycApi } from "@/lib/api/endpoints/kyc";
import { Clock, AlertTriangle, XCircle } from "lucide-react";
import type { KYCStatusResponse } from "@/types/kyc";

interface KYCBannerProps {
  className?: string;
}

export default function KYCBanner({ className = "" }: KYCBannerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [kycStatus, setKycStatus] = useState<KYCStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  // Load KYC status
  useEffect(() => {
    loadKYCStatus();
    const interval = setInterval(loadKYCStatus, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!kycStatus || kycStatus.status !== 'not_submitted' || kycStatus.isExpired || !kycStatus.kycDeadline) {
      setTimeRemaining(null);
      return;
    }

    const updateTimer = () => {
      const deadline = new Date(kycStatus.kycDeadline!);
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [kycStatus]);

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

  const handleKYCClick = () => {
    router.push('/user/kyc');
  };

  const formatTimer = () => {
    if (!timeRemaining) return '';
    
    const { days, hours, minutes, seconds } = timeRemaining;
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  };

  // Don't render anything while loading, if KYC is approved, or if we're on the KYC page itself
  if (loading || !kycStatus || kycStatus.status === 'approved' || pathname === '/user/kyc') {
    return null;
  }

  // Render different banners based on KYC status
  const renderBanner = () => {
    switch (kycStatus.status) {
      case 'not_submitted':
        return (
          <div 
            className={`flex items-center justify-between p-4 border-l-4 cursor-pointer hover:opacity-80 transition-opacity ${
              kycStatus.isExpired || (timeRemaining?.days === 0 && timeRemaining?.hours === 0 && timeRemaining?.minutes < 60)
                ? 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'
                : 'bg-orange-100 dark:bg-orange-900/20 border-orange-500 text-orange-800 dark:text-orange-200'
            } ${className}`}
            onClick={handleKYCClick}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              <div>
                <h4 className="font-medium">
                  {kycStatus.isExpired ? 'KYC Submission Overdue!' : 'Complete Your KYC Verification'}
                </h4>
                <p className="text-sm opacity-90">
                  {kycStatus.isExpired 
                    ? 'Your KYC deadline has passed. Submit immediately to maintain account access.'
                    : kycStatus.daysRemaining !== null 
                      ? `You have ${kycStatus.daysRemaining} days remaining to submit your KYC documents.`
                      : 'Submit your documents to continue using all platform features.'
                  }
                </p>
              </div>
            </div>
            {(timeRemaining || kycStatus.daysRemaining !== null) && !kycStatus.isExpired && (
              <div className="flex items-center gap-2 text-right">
                <Clock className="w-4 h-4" />
                <div>
                  {timeRemaining ? (
                    <>
                      <div className="font-mono text-lg font-bold">
                        {formatTimer()}
                      </div>
                      <div className="text-xs opacity-75">
                        remaining
                      </div>
                    </>
                  ) : kycStatus.daysRemaining !== null && (
                    <>
                      <div className="font-mono text-lg font-bold">
                        {kycStatus.daysRemaining}d
                      </div>
                      <div className="text-xs opacity-75">
                        remaining
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'pending':
        return (
          <div className={`flex items-center gap-3 p-4 border-l-4 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200 ${className}`}>
            <Clock className="w-5 h-5" />
            <div>
              <h4 className="font-medium">KYC Under Review</h4>
              <p className="text-sm opacity-90">
                Your documents are being reviewed. We'll notify you once completed.
              </p>
            </div>
          </div>
        );

      case 'rejected':
        return (
          <div 
            className={`flex items-center justify-between p-4 border-l-4 bg-red-100 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200 cursor-pointer hover:opacity-80 transition-opacity ${className}`}
            onClick={handleKYCClick}
          >
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5" />
              <div>
                <h4 className="font-medium">KYC Rejected - Action Required</h4>
                <p className="text-sm opacity-90">
                  {kycStatus.kycData?.rejectionReason || 'Your KYC submission was rejected. Click to resubmit.'}
                </p>
              </div>
            </div>
            <div className="text-sm font-medium">
              Click to Resubmit
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderBanner();
}

// Hook for getting KYC status in other components
export const useKYCStatus = () => {
  const [kycStatus, setKycStatus] = useState<KYCStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    try {
      setLoading(true);
      const status = await kycApi.getStatus();
      setKycStatus(status);
    } catch (error) {
      console.error('Failed to load KYC status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  return { kycStatus, loading, refetch: loadStatus };
};

