import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthFormFieldProps {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

export function AuthFormField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  className = "",
}: AuthFormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1 w-full max-w-[392px] mx-auto px-4", className)}>
      <Label htmlFor={id} className="text-white text-[16px] font-normal font-romanica">
        {label}
      </Label>
      {type === "password" ? (
        <div className="relative">
          <PasswordInput
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "w-full h-[49px] text-[16px] font-regular text-[#99A0AE] placeholder:text-[16px] placeholder:text-[#99A0AE] font-regular font-creato-display rounded-none",
              error && "border-red-400 focus-visible:border-red-400"
            )}
            style={{
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid #FFFFFF1A',
              paddingTop: '14px',
              paddingRight: '50px',
              paddingBottom: '14px',
              paddingLeft: '20px'
            }}
            showToggle={true}
          />
        </div>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full h-[49px] text-[16px] font-regular text-[#99A0AE] placeholder:text-[16px] placeholder:text-[#99A0AE] font-regular font-creato-display rounded-none",
            error && "border-red-400 focus-visible:border-red-400"
          )}
          style={{
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            border: '1px solid #FFFFFF1A',
            paddingTop: '14px',
            paddingRight: '20px',
            paddingBottom: '14px',
            paddingLeft: '20px'
          }}
        />
      )}
      {error && (
        <span className="text-red-400 text-xs font-creato-display">
          {error}
        </span>
      )}
    </div>
  );
}
