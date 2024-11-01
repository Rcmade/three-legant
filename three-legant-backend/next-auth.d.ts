// import { DefaultSession } from "next-auth";
import { UserRole } from "./src/types/index";
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isOAuth: boolean;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User extends UpsertUserResponseT {}

  interface JWT extends UpsertUserResponseT {}
}

// declare module "@auth/core/jwt" {
//   interface JWT {
//     role?: UserRole;
//   }
// }
