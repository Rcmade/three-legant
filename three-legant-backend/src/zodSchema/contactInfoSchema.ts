// import { onlyLetters } from "@/constant";
import { z } from "zod";

export const contactInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name cannot exceed 50 characters" }),
  // .regex(onlyLetters, {
  //   message: "First name should only contain alphabets",
  // }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name cannot exceed 50 characters" }),
  // .regex(onlyLetters, {
  //   message: "Last name should only contain alphabets",
  // }),
  email: z.string().email({ message: "Invalid email address" }),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number cannot exceed 15 digits" })
    .regex(/^[0-9]+$/, { message: "Phone number should only contain numbers" }),
});
