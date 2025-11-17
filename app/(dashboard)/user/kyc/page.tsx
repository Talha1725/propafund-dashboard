"use client";

import { useEffect, useState } from "react";
import { kycApi } from "@/lib/api/endpoints/kyc";
import { toast } from "sonner";
import { Save, Upload, FileText, Check, X, Clock, AlertTriangle, Shield } from "lucide-react";
import type { KYCFormData, KYCStatusResponse } from "@/types/kyc";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SumsubWidget from "@/components/kyc/sumsub-widget";

// Common countries list
const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "NL", label: "Netherlands" },
  { value: "BE", label: "Belgium" },
  { value: "CH", label: "Switzerland" },
  { value: "AT", label: "Austria" },
  { value: "SE", label: "Sweden" },
  { value: "NO", label: "Norway" },
  { value: "DK", label: "Denmark" },
  { value: "FI", label: "Finland" },
  { value: "PL", label: "Poland" },
  { value: "CZ", label: "Czech Republic" },
  { value: "IE", label: "Ireland" },
  { value: "PT", label: "Portugal" },
  { value: "GR", label: "Greece" },
  { value: "JP", label: "Japan" },
  { value: "CN", label: "China" },
  { value: "IN", label: "India" },
  { value: "BR", label: "Brazil" },
  { value: "MX", label: "Mexico" },
  { value: "AR", label: "Argentina" },
  { value: "ZA", label: "South Africa" },
  { value: "NZ", label: "New Zealand" },
  { value: "SG", label: "Singapore" },
  { value: "HK", label: "Hong Kong" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "TR", label: "Turkey" },
  { value: "RU", label: "Russia" },
  { value: "KR", label: "South Korea" },
  { value: "TH", label: "Thailand" },
  { value: "MY", label: "Malaysia" },
  { value: "ID", label: "Indonesia" },
  { value: "PH", label: "Philippines" },
  { value: "VN", label: "Vietnam" },
];

export default function KYCPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [kycStatus, setKycStatus] = useState<KYCStatusResponse | null>(null);
  const [frontIdPreview, setFrontIdPreview] = useState<string | null>(null);
  const [backIdPreview, setBackIdPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'manual' | 'sumsub'>('manual');

  const [formData, setFormData] = useState<KYCFormData>({
    fullName: "",
    dateOfBirth: "",
    residentialAddress: "",
    city: "",
    country: "",
    postalCode: "",
    idType: "",
    frontIdImage: undefined,
    backIdImage: undefined,
  });

  // Load KYC status
  useEffect(() => {
    loadKYCStatus();
  }, []);

  const loadKYCStatus = async () => {
    try {
      setLoading(true);
      const status = await kycApi.getStatus();
      setKycStatus(status);

      // Pre-fill form with existing KYC data if available
      if (status.kycData && status.kycData.fullName) {
        setFormData({
          fullName: status.kycData.fullName || "",
          dateOfBirth: status.kycData.dateOfBirth ? status.kycData.dateOfBirth.split('T')[0] : "",
          residentialAddress: status.kycData.residentialAddress || "",
          city: status.kycData.city || "",
          country: status.kycData.country || "",
          postalCode: status.kycData.postalCode || "",
          idType: status.kycData.idType || "",
          frontIdImage: undefined,
          backIdImage: undefined,
        });
        
        // Set previews if images exist
        if (status.kycData.frontIdImageUrl) {
          setFrontIdPreview(status.kycData.frontIdImageUrl);
        }
        if (status.kycData.backIdImageUrl) {
          setBackIdPreview(status.kycData.backIdImageUrl);
        }
      }
    } catch (error: any) {
      console.error('Failed to load KYC status:', error);
      toast.error('Failed to load KYC status');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear back image when switching to passport (since it's not needed)
    if (name === 'idType' && value === 'passport') {
      setBackIdPreview(null);
      setFormData(prev => ({ ...prev, backIdImage: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type - only PNG and JPEG allowed
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PNG or JPEG image only');
      e.target.value = '';
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast.error(`Image size must be less than 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB`);
      e.target.value = '';
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'front') {
        setFrontIdPreview(result);
        setFormData(prev => ({ ...prev, frontIdImage: file }));
      } else {
        setBackIdPreview(result);
        setFormData(prev => ({ ...prev, backIdImage: file }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!kycStatus?.canSubmit) {
      toast.error('You cannot submit KYC at this time');
      return;
    }

    // Validation
    if (!formData.fullName || !formData.dateOfBirth || !formData.residentialAddress || 
        !formData.city || !formData.country || !formData.idType) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.frontIdImage) {
      toast.error('Please upload the front of your ID document');
      return;
    }

    // Check if back ID is required for certain ID types
    if (formData.idType === 'drivers_license' && !formData.backIdImage) {
      toast.error('Please upload both sides of your driver\'s license');
      return;
    }

    try {
      setSubmitting(true);

      // Create form data
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('dateOfBirth', formData.dateOfBirth);
      submitData.append('residentialAddress', formData.residentialAddress);
      submitData.append('city', formData.city);
      submitData.append('country', formData.country);
      if (formData.postalCode) {
        submitData.append('postalCode', formData.postalCode);
      }
      submitData.append('idType', formData.idType);
      submitData.append('front_id', formData.frontIdImage);
      if (formData.backIdImage) {
        submitData.append('back_id', formData.backIdImage);
      }

      const result = await kycApi.submit(submitData);
      console.log('KYC submission result:', result);
      toast.success('KYC submitted successfully! We will review it shortly.');
      
      // Reload status
      await loadKYCStatus();
    } catch (error: any) {
      console.error('KYC submission error:', error);
      
      // Handle specific error codes
      if (error.response?.status === 413) {
        toast.error('❌ File size too large! Please make sure your images are under 10MB each and try again.');
      } else if (error.response?.status === 415) {
        toast.error('❌ Invalid file format! Please upload PNG or JPEG images only.');
      } else if (error.response?.data?.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Failed to submit KYC. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <X className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusMessage = () => {
    if (!kycStatus) return null;

    switch (kycStatus.status) {
      case 'not_submitted':
        return (
          <div className="bg-orange-100 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-700 p-4 mb-6 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium text-orange-800 dark:text-orange-200">KYC Required</h3>
            </div>
            <p className="text-orange-700 dark:text-orange-300 mt-1">
              You have {kycStatus.daysRemaining} days remaining to submit your KYC documents.
              {kycStatus.isExpired && " Your deadline has passed - please submit immediately."}
            </p>
          </div>
        );
      case 'pending':
        return (
          <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 p-4 mb-6 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Under Review</h3>
            </div>
            <p className="text-yellow-700 dark:text-yellow-300 mt-1">
              Your KYC documents are being reviewed. We'll notify you once the review is complete.
            </p>
          </div>
        );
      case 'approved':
        return (
          <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 p-4 mb-6 rounded-lg">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-green-800 dark:text-green-200">KYC Approved</h3>
            </div>
            <p className="text-green-700 dark:text-green-300 mt-1">
              Your identity has been successfully verified. You have full access to all features.
            </p>
          </div>
        );
      case 'rejected':
        return (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 p-4 mb-6 rounded-lg">
            <div className="flex items-center gap-2">
              <X className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-red-800 dark:text-red-200">KYC Rejected</h3>
            </div>
            <p className="text-red-700 dark:text-red-300 mt-1">
              {kycStatus.kycData?.rejectionReason || "Your KYC submission was rejected. Please review and resubmit."}
            </p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <DashboardPageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner variant="ring" className="h-8 w-8 text-white" />
        </div>
      </DashboardPageContainer>
    );
  }

  return (
    <DashboardPageContainer>
      <div className="max-w-6xl mx-auto text-white">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-6 h-6" />
          <h2 className="text-xl font-semibold text-white">
            Know Your Customer (KYC)
          </h2>
          {kycStatus && getStatusIcon(kycStatus.status)}
        </div>

        {getStatusMessage()}

        {/* KYC Form - only show if user can submit */}
        {kycStatus?.canSubmit && (
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'manual' | 'sumsub')} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Manual Upload
              </TabsTrigger>
              <TabsTrigger value="sumsub" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Sumsub Verification
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="mt-0">
              <form onSubmit={handleSubmit} className="space-y-8 w-full">
            {/* Personal Information */}
            <div className="bg-white/5 border border-white/10 rounded-lg px-6 py-6 text-white">
              <h3 className="text-xl font-medium mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Michael Doe"
                    required
                    className="w-full border border-white/10 px-4 py-3 bg-white/5 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-white/10 px-4 py-3 bg-white/5 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => handleSelectChange('country', value)}
                  >
                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white/5 border border-white/10 rounded-lg px-6 py-6 text-white">
              <h3 className="text-xl font-medium mb-6">Address Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm mb-1">
                    Residential Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    required
                    className="w-full border border-white/10 px-4 py-3 bg-white/5 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                    className="w-full border border-white/10 px-4 py-3 bg-white/5 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="w-full border border-white/10 px-4 py-3 bg-white/5 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
              </div>
            </div>

            {/* ID Document Upload */}
            <div className="bg-white/5 border border-white/10 rounded-lg px-6 py-6 text-white">
              <h3 className="text-xl font-medium mb-6">Identity Document</h3>
              
              <div className="mb-6">
                <label className="block text-sm mb-1">
                  Document Type <span className="text-red-500">*</span>
                </label>
                <div className="w-full max-w-xs">
                  <Select
                    value={formData.idType}
                    onValueChange={(value) => handleSelectChange('idType', value)}
                  >
                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select Document Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="drivers_license">Driver's License</SelectItem>
                      <SelectItem value="government_id">Government ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Front ID Upload */}
                <div>
                  <label className="block text-sm mb-2">
                    Front of Document <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center relative">
                    {frontIdPreview ? (
                      <div className="relative">
                        <img
                          src={frontIdPreview}
                          alt="Front ID Preview"
                          className="max-w-full h-48 object-contain mx-auto rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFrontIdPreview(null);
                            setFormData(prev => ({ ...prev, frontIdImage: undefined }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="py-8">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-white/50" />
                          <p className="text-sm text-white/70 mb-4">Click to upload front of document</p>
                          <button
                            type="button"
                            onClick={() => document.getElementById('frontIdInput')?.click()}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded hover:opacity-90"
                          >
                            Choose File
                          </button>
                        </div>
                        <input
                          id="frontIdInput"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={(e) => handleFileChange(e, 'front')}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-2">JPEG, PNG. Max 10MB</p>
                </div>

                {/* Back ID Upload - only for driver's license */}
                <div>
                  <label className="block text-sm mb-2">
                    Back of Document {formData.idType === 'drivers_license' && <span className="text-red-500">*</span>}
                  </label>
                  <div className={`border-2 border-dashed border-white/20 rounded-lg p-4 text-center relative ${formData.idType === 'passport' ? 'opacity-50' : ''}`}>
                    {backIdPreview ? (
                      <div className="relative">
                        <img
                          src={backIdPreview}
                          alt="Back ID Preview"
                          className="max-w-full h-48 object-contain mx-auto rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setBackIdPreview(null);
                            setFormData(prev => ({ ...prev, backIdImage: undefined }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="py-8">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-white/50" />
                          <p className="text-sm text-white/70 mb-4">
                            {formData.idType === 'passport' 
                              ? 'Not required for passport' 
                              : 'Click to upload back of document'
                            }
                          </p>
                          {formData.idType !== 'passport' && (
                            <button
                              type="button"
                              onClick={() => document.getElementById('backIdInput')?.click()}
                              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded hover:opacity-90"
                            >
                              Choose File
                            </button>
                          )}
                        </div>
                        {formData.idType !== 'passport' && (
                          <input
                            id="backIdInput"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={(e) => handleFileChange(e, 'back')}
                            className="hidden"
                          />
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    {formData.idType === 'passport' 
                      ? 'Passports only require front page' 
                      : 'JPEG, PNG. Max 10MB'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center lg:justify-start pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full max-w-md lg:w-auto flex justify-center items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p>{submitting ? "Submitting..." : "Submit KYC"}</p>
                <Save className="w-4 h-4" />
              </button>
            </div>
          </form>
            </TabsContent>

            <TabsContent value="sumsub" className="mt-0">
              <div className="space-y-4">
                <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                        Automated Verification with Sumsub
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Complete your KYC verification quickly and securely using our automated verification system. 
                        Follow the on-screen instructions to submit your documents.
                      </p>
                    </div>
                  </div>
                </div>
                
                <SumsubWidget
                  onComplete={async (applicantId, verificationData) => {
                    try {
                      // When Sumsub verification is completed, verify the status with backend
                      const result = await kycApi.verifySumsubStatus();
                      if (result.success) {
                        if (result.data?.statusChanged) {
                          toast.success(`KYC status updated: ${result.data.status}`);
                        } else {
                          toast.success('Verification completed successfully!');
                        }
                      }
                      // Always reload KYC status after verification to get latest status from /api/kyc/status
                      await loadKYCStatus();
                    } catch (error: any) {
                      console.error('Sumsub verification error:', error);
                      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to verify KYC status';
                      toast.error(errorMsg);
                      // Still reload KYC status even on error to get current state
                      await loadKYCStatus();
                    }
                  }}
                  onError={(error) => {
                    console.error('Sumsub widget error:', error);
                  }}
                  theme="dark"
                />
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Locked Message for approved/pending */}
        {kycStatus?.isLocked && (
          <div className="w-full">
            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-8 text-white text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                {getStatusIcon(kycStatus.status)}
                <h3 className="text-xl font-medium">
                  {kycStatus.status === 'approved' ? 'KYC Completed' : 'KYC Under Review'}
                </h3>
              </div>
              <p className="text-white/70">
                {kycStatus.status === 'approved' 
                  ? 'Your identity has been verified successfully.'
                  : 'Your documents are being reviewed. You cannot make changes at this time.'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardPageContainer>
  );
}

