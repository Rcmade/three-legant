// import { onlyLetters } from "../../../three-legant-frontend/src/constant/index";
import { z } from "zod";

// Zod Schema
export const addressSchema = z.object({
  street: z
    .string()
    .min(1, { message: "Street is required" })
    .max(100, { message: "Street name cannot exceed 100 characters" }),

  country: z
    .string()
    .min(1, { message: "Country is required" })
    .max(50, { message: "Country name cannot exceed 50 characters" }),
  // .regex(onlyLetters, {
  //   message: "Country name should only contain alphabets",
  // }),
  city: z
    .string()
    .min(1, { message: "Town or city is required" })
    .max(50, { message: "Town or city cannot exceed 50 characters" }),
  // .regex(onlyLetters, {
  //   message: "Town or city should only contain alphabets",
  // }),
  state: z
    .string()
    .min(1, { message: "State is required" })
    .max(50, { message: "State cannot exceed 50 characters" }),
  //   .regex(onlyLetters, { message: "State should only contain alphabets" }),
  zipCode: z
    .string()
    .min(5, { message: "Zip code must be at least 5 characters" })
    .max(10, { message: "Zip code cannot exceed 10 characters" }),
  // .regex(/^[0-9A-Za-z]+$/, {
  //   message: "Zip code should only contain letters and numbers",
  // }),
});
