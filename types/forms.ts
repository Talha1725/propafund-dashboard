// Form-related types
export type FieldConfig =
  | { type: "text" | "email"; name: string; label: string; placeholder?: string; fullWidth?: boolean }
  | { type: "textarea"; name: string; label: string; placeholder?: string; rows?: number; fullWidth?: boolean }
  | { type: "select"; name: string; label: string; placeholder?: string; options: { label: string; value: string }[]; fullWidth?: boolean };

// Form submission types
export interface FormSubmissionData {
  [key: string]: string;
}

// Form validation types
export interface FormValidationError {
  field: string;
  message: string;
}
