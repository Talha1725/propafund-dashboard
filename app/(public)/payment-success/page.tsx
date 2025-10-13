"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePayment } from '@/hooks/use-payment';
import Container from '@/components/common/container';
import HeroSection from '@/components/home-page/hero-section';
import SectionHeader from '@/components/common/section-header';
import FramedTable from '@/components/common/framed-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Copy, Download, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import purchaseBg from '@/public/assets/promo-bg.svg';
import type { PaymentStatusResponse } from '@/types/payment-api';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // OxaPay returns with trackId in URL
  const urlTrackId = searchParams.get('trackId');
  
  // Get trackId from URL or localStorage
  let trackId = urlTrackId;
  if (!trackId && typeof window !== 'undefined') {
    trackId = localStorage.getItem('trackId');
  }
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { checkPaymentStatus } = usePayment();

  const checkPaymentStatusCallback = useCallback(async () => {
    if (!trackId) {
      setError('No payment tracking ID found');
      setLoading(false);
      return;
    }

    try {
      const response = await checkPaymentStatus(trackId);
      
      if (response) {
        setPaymentStatus(response);
        setLoading(false);
      } else {
        setError('Failed to check payment status');
        setLoading(false);
      }
    } catch (err: unknown) {
      console.error('Payment status check failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to check payment status');
      setLoading(false);
    }
  }, [trackId, checkPaymentStatus]);

  useEffect(() => {
    checkPaymentStatusCallback();
  }, [checkPaymentStatusCallback]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const downloadAccountDetails = () => {
    if (!paymentStatus?.account) return;
    
    const account = paymentStatus.account;
    const content = `
Trading Account Details
======================

Account ID: ${account.accountId}
Login: ${account.login}
Server: ${account.server}
Password: ${account.password}
Platform: ${account.platform}
Balance: $${account.balance.toLocaleString()}
Challenge Type: ${account.challengeType}

Please keep this information secure and do not share it with anyone.
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trading-account-${account.accountId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Account details downloaded');
  };

  if (loading) {
    return (
      <>
        <HeroSection 
          image={purchaseBg}
          titleLine1="Payment"
          titleLine2="Processing"
          subtitle="Please wait while we verify your payment..."
          showButton={false}
          isHomepage={false}
        />
        <div className="font-creato-display pb-30 pt-27">
          <Container>
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-white/70">Verifying your payment...</p>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeroSection 
          image={purchaseBg}
          titleLine1="Payment"
          titleLine2="Error"
          subtitle="There was an issue processing your payment"
          showButton={false}
          isHomepage={false}
        />
        <div className="font-creato-display pb-30 pt-27">
          <Container>
            <div className="flex justify-center items-center min-h-[400px]">
              <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Payment Error</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Button onClick={() => router.push('/complete-purchase')}>
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </div>
      </>
    );
  }

  const isPaid = paymentStatus?.payment?.status === 'Paid';
  const account = paymentStatus?.account;

  return (
    <>
      <HeroSection 
        image={purchaseBg}
        titleLine1={isPaid ? "Payment" : "Payment"}
        titleLine2={isPaid ? "Successful" : "Pending"}
        subtitle={isPaid ? "Your trading account has been created successfully!" : "Your payment is being processed..."}
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display pb-30 pt-27">
        <Container>
          <SectionHeader 
            title={isPaid ? "Account Details" : "Payment Status"} 
            text={isPaid ? "Your trading account is ready. Please save these details securely." : "We're processing your payment. You'll receive your account details shortly."} 
          />
          
          <div className="mt-10 max-w-4xl mx-auto">
            {isPaid && account ? (
              <div className="space-y-6">
                {/* Success Message */}
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-green-800">Payment Successful!</h3>
                        <p className="text-green-700">Your trading account has been created and is ready to use.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Trading Account Details
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadAccountDetails}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Account ID</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              value={account.accountId}
                              readOnly
                              className="bg-gray-50"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(account.accountId, 'Account ID')}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-600">Login</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              value={account.login}
                              readOnly
                              className="bg-gray-50"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(account.login, 'Login')}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-600">Server</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              value={account.server}
                              readOnly
                              className="bg-gray-50"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(account.server, 'Server')}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Password</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              value={account.password}
                              readOnly
                              type="password"
                              className="bg-gray-50"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(account.password, 'Password')}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-600">Platform</label>
                          <Input
                            value={account.platform.toUpperCase()}
                            readOnly
                            className="bg-gray-50"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-600">Balance</label>
                          <Input
                            value={`$${account.balance.toLocaleString()}`}
                            readOnly
                            className="bg-gray-50"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Summary */}
                <FramedTable
                  headers={["Parameter", "Value"]}
                  rows={[
                    ["Account ID", account.accountId],
                    ["Login", account.login],
                    ["Server", account.server],
                    ["Platform", account.platform.toUpperCase()],
                    ["Balance", `$${account.balance.toLocaleString()}`],
                    ["Challenge Type", account.challengeType],
                    ["Source", account.source]
                  ]}
                  showHeaders={false}
                />

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => router.push('/dashboard')}
                    className="px-8"
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/get-funded')}
                    className="px-8"
                  >
                    Get Another Account
                  </Button>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold mb-2">Payment Processing</h3>
                    <p className="text-gray-600 mb-4">
                      Your payment is being processed. This may take a few minutes.
                      You'll receive your account details once the payment is confirmed.
                    </p>
                    <p className="text-sm text-gray-500">
                      Payment Status: {paymentStatus?.payment?.status || 'Processing'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export default function PaymentSuccessPage() {
  return <PaymentSuccessContent />;
}
