import { cn } from "@/lib/utils";
import { PasswordRequirementsProps } from "@/types/auth";

export function PasswordRequirements({ 
  password, 
  className = "" 
}: PasswordRequirementsProps) {
  const requirements = [
    {
      text: "Must contain 1 uppercase letter",
      isValid: /[A-Z]/.test(password),
    },
    {
      text: "Must contain 1 number",
      isValid: /[0-9]/.test(password),
    },
    {
      text: "Min. 8 characters",
      isValid: password.length >= 8,
    },
    {
      text: "Must contain 1 special character",
      isValid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    },
  ];

  return (
    <div className={cn("space-y-2 text-xs", className)}>
      {requirements.map((req, index) => (
        <div key={index} className="flex items-center gap-2">
          {req.isValid ? (
            <svg 
              className="w-3 h-3 text-green-400 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg 
              className="w-3 h-3 text-gray-700 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          <span className={cn(
            "text-[12px] font-creato-display",
            req.isValid ? "text-green-400" : "text-[#525866]"
          )}>
            {req.text}
          </span>
        </div>
      ))}
    </div>
  );
}
