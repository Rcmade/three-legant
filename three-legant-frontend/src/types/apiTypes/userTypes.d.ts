export type UserT = {
  email: string;
  name: string;
  image: string | null;
  id: string;
  role: "ADMIN" | "USER" | "SELLER";
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
};
