"use client";

import { useMemo } from "react";
import { PasswordStrengthIndicatorProps } from "@/types/auth";

// Simple SVG icons for password strength indicators
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#10B981"/>
    <path d="M5.5 8L7 9.5L10.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NotCompletedIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" stroke="#6B7280" fill="none"/>
  </svg>
);

const validatePassword = (password: string) => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  number: /[0-9]/.test(password),
});

const requirements = [
  { key: 'uppercase', label: 'At least 1 uppercase' },
  { key: 'number', label: 'At least 1 number' },
  { key: 'length', label: 'At least 8 characters' },
] as const;

const getStrengthColor = (score: number) => {
  if (score === 0) return "bg-red-500";
  if (score === 1) return "bg-yellow-500";
  if (score === 2) return "bg-orange-500";
  return "bg-green-500";
};

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const { checks, score } = useMemo(() => {
    const validation = validatePassword(password || '');
    const score = Object.values(validation).filter(Boolean).length;
    return { checks: validation, score };
  }, [password]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((index) => (
          <div key={index} className="w-full h-1 rounded-sm bg-white/20 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                index < score 
                  ? `${getStrengthColor(score)} w-full`
                  : "w-0"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Requirements List */}
      <div className="space-y-2">
    <p className="text-xs text-gray-400 settings-label">
      Must contain at least:
    </p>
        <div className="space-y-1">
          {requirements.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              {checks[key] ? (
                <CheckIcon className="w-3 h-3 flex-shrink-0" />
              ) : (
                <NotCompletedIcon className="w-3 h-3 flex-shrink-0" />
              )}
        <p className={`text-xs settings-label ${
          checks[key] ? "text-green-400" : "text-gray-400"
        }`}>
          {label}
        </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
