export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;

export const CLOUDINARY_REGEX =
  /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video|raw)\/)?(?:(upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;

export const ENGLISH_NUMBERS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
  "Twenty",
  "Twenty-One",
  "Twenty-Two",
  "Twenty-Three",
  "Twenty-Four",
  "Twenty-Five",
  "Twenty-Six",
  "Twenty-Seven",
  "Twenty-Eight",
  "Twenty-Nine",
  "Thirty",
];

export const REFERRAL_CODE_PATH_WITH_SLASH = "/admin/referral-coupon-code";

export const DARK_LOGO_PUBLIC_URL = `https://dart-mist.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdu1fpl9ph%2Fimage%2Fupload%2Fv1715758563%2Fdart%2Fxagkclhvvc5e14hurx1l.jpg&w=128&q=75`;

export const FAVICON_LOGO_PUBLIC_URL = DARK_LOGO_PUBLIC_URL;

export const imagePrefix = `https://res.cloudinary.com/dg3fkrz9h/image/upload`;
