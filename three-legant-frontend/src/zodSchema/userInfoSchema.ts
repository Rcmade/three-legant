import { onlyLetters } from "@/constant";
import { z } from "zod";

export const userInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name cannot exceed 50 characters" })
    .regex(onlyLetters, {
      message: "First name should only contain alphabets",
    }),

  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name cannot exceed 50 characters" })
    .regex(onlyLetters, {
      message: "Last name should only contain alphabets",
    }),

  displayName: z
    .string()
    .min(1, { message: "Display name is required" })
    .max(50, { message: "Display name cannot exceed 50 characters" }),

  email: z.string().email({ message: "Invalid email address" }),
});
