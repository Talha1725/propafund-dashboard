"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFormField } from "@/components/auth/auth-form-field";

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simple validation
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    
    if (!fullName) {
      setFullNameError("Full name is required");
      setIsSubmitting(false);
      return;
    }
    
    if (!email) {
      setEmailError("Email is required");
      setIsSubmitting(false);
      return;
    }
    
    if (!password) {
      setPasswordError("Password is required");
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };


  return (
    <AuthLayout imageType="signup">
      <AuthForm
        title="CREATE YOUR ACCOUNT"
        subtitle="Enter your details to create an account."
        titleClassName="font-romanica font-normal text-[26px]"
        onSubmit={handleSubmit}
        buttonText={isSubmitting ? "Creating Account..." : "Create Account"}
        isSubmitting={isSubmitting}
        linkText="Already have an account?"
        linkHref="/login"
        linkLabel="Login"
      >

        <AuthFormField
          id="fullName"
          label="FULL NAME"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={setFullName}
          error={fullNameError}
        />

        <AuthFormField
          id="email"
          label="EMAIL ADDRESS"
          type="email"
          placeholder="hello@fxutopia.com"
          value={email}
          onChange={setEmail}
          error={emailError}
        />

        <AuthFormField
          id="password"
          label="PASSWORD"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          error={passwordError}
        />

      </AuthForm>
    </AuthLayout>
  );
}