"use client";

import { useEffect, useState } from "react";
import { kycApi } from "@/lib/api/endpoints/kyc";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

// Dynamically import Sumsub SDK to avoid SSR issues
const SumsubWebSdk = dynamic(
  () => import('@sumsub/websdk-react'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center bg-white/5 border border-white/10 rounded-lg">
        <div className="text-center">
          <Spinner variant="ring" className="h-8 w-8 text-white mx-auto mb-4" />
          <p className="text-white/70">Loading verification widget...</p>
        </div>
      </div>
    )
  }
);

interface SumsubWidgetProps {
  onComplete?: (applicantId: string, verificationData: any) => void;
  onError?: (error: any) => void;
  theme?: 'light' | 'dark';
}

export default function SumsubWidget({ 
  onComplete, 
  onError,
  theme = 'dark'
}: SumsubWidgetProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadToken = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get access token from backend
        let tokenResponse;
        try {
          tokenResponse = await kycApi.getSumsubAccessToken();
        } catch (err: any) {
          // Handle API errors
          const errorData = err.response?.data;
          const errorMessage = errorData?.message || errorData?.error || err.message;
          
          if (err.response?.status === 401) {
            // 401 could be user auth or Sumsub API auth failure
            if (errorMessage?.includes('Sumsub') || errorMessage?.includes('token generation')) {
              throw new Error('Sumsub verification service is currently unavailable. Please use the Manual Upload option or contact support.');
            }
            throw new Error('Authentication failed. Please contact support if this issue persists.');
          } else if (err.response?.status === 400) {
            // 400 usually means Sumsub is not enabled or misconfigured
            const errorMsg = errorMessage || 'Sumsub integration is not available';
            throw new Error(errorMsg + '. Please use the Manual Upload option instead.');
          } else if (err.response?.status === 500) {
            throw new Error('Server error occurred. Please try again later or use the Manual Upload option.');
          } else if (errorMessage) {
            throw new Error(errorMessage);
          }
          throw new Error('Failed to get access token from server. Please try again later or use the Manual Upload option.');
        }
        
        const { token, success } = tokenResponse;
        
        if (!success || !token) {
          throw new Error('Failed to get access token from server');
        }

        if (mounted) {
          setAccessToken(token);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Failed to load Sumsub token:', err);
        if (mounted) {
          const errorMessage = err.message || 'Failed to initialize verification';
          setError(errorMessage);
          setLoading(false);
          if (onError) {
            onError(err);
          }
          toast.error(errorMessage);
        }
      }
    };

    loadToken();

    return () => {
      mounted = false;
    };
  }, [onError]);

  // Token expiration handler
  const expirationHandler = async (): Promise<string> => {
    try {
      const { token, success } = await kycApi.getSumsubAccessToken();
      if (!success || !token) {
        throw new Error('Failed to refresh access token');
      }
      setAccessToken(token);
      return token;
    } catch (err: any) {
      console.error('Failed to refresh Sumsub token:', err);
      if (err.response?.status === 401) {
        throw new Error('Authentication failed. Please refresh the page.');
      } else if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw new Error('Failed to refresh access token. Please try again.');
    }
  };

  // Message handler
  const handleMessage = (type: string, payload: any) => {
    console.log('Sumsub message:', type, payload);
    
    if (type === 'idCheck.onStepCompleted') {
      console.log('Step completed:', payload);
    }
    
    if (type === 'idCheck.onApplicantSubmitted') {
      console.log('Applicant submitted:', payload);
      if (onComplete) {
        onComplete(payload.applicantId || payload.applicant?.id, payload);
      }
    }
  };

  // Error handler
  const handleError = (error: any) => {
    console.error('Sumsub error:', error);
    const errorMessage = error.message || 'An error occurred during verification';
    setError(errorMessage);
    if (onError) {
      onError(error);
    }
    toast.error('Verification error: ' + errorMessage);
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-white/5 border border-white/10 rounded-lg">
        <div className="text-center">
          <Spinner variant="ring" className="h-8 w-8 text-white mx-auto mb-4" />
          <p className="text-white/70">Loading verification widget...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-white/5 border border-white/10 rounded-lg">
        <div className="text-center p-8 max-w-md">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Verification Service Unavailable</h3>
          <p className="text-red-400 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded hover:opacity-90"
            >
              Retry
            </button>
            <p className="text-sm text-white/60">
              You can also use the <strong>Manual Upload</strong> tab to submit your documents.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!accessToken) {
    return null;
  }

  return (
    <div className="w-full min-h-[600px] bg-white/5 border border-white/10 rounded-lg overflow-hidden">
      <SumsubWebSdk
        accessToken={accessToken}
        expirationHandler={expirationHandler}
        config={{
          lang: 'en',
        }}
        options={{
          theme: theme,
        }}
        onMessage={handleMessage}
        onError={handleError}
        className="w-full h-full"
      />
    </div>
  );
}

