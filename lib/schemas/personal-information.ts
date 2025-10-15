import { z } from "zod";

// Profile Picture Schema
export const profilePictureSchema = z.object({
  profileImage: z.string().optional(),
});

// Personal Information Schema
export const personalInformationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a gender",
  }),
});

// Contact Information Schema
export const contactInformationSchema = z.object({
  contactNumber: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid contact number"),
  emailAddress: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(1, "Please select a city"),
  address: z.string().min(1, "Address is required"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^[A-Za-z0-9\s\-]+$/, "Please enter a valid postal code"),
});

// Combined Schema
export const personalInformationFormSchema = z.object({
  profile: profilePictureSchema,
  personal: personalInformationSchema,
  contact: contactInformationSchema,
});

// Type definitions
export type PersonalInformationFormData = z.infer<typeof personalInformationFormSchema>;
export type PersonalInformationData = z.infer<typeof personalInformationSchema>;
export type ContactInformationData = z.infer<typeof contactInformationSchema>;
export type ProfilePictureData = z.infer<typeof profilePictureSchema>;
