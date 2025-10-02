import { z } from "zod";

// Profile Picture Schema
export const profilePictureSchema = z.object({
  profileImage: z.string().optional(),
});

// Account Information Schema
export const accountInformationSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9._]+$/, "Username can only contain letters, numbers, dots, and underscores"),
  country: z.string().min(1, "Please select a country"),
  timeZone: z.string().min(1, "Please select a time zone"),
});

// Combined Account Information Schema
export const accountInformationFormSchema = z.object({
  profile: profilePictureSchema,
  account: accountInformationSchema,
});

// Type definitions
export type AccountInformationFormData = z.infer<typeof accountInformationFormSchema>;
export type ProfilePictureData = z.infer<typeof profilePictureSchema>;
export type AccountInformationData = z.infer<typeof accountInformationSchema>;
