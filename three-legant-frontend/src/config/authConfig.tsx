import NextAuth from "next-auth";
import authProvidersConfig from "@/config/authProvidersConfig";
import axios from "axios";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { upsertUserApi } from "@/constant/apiRoute";
import { UpsertUserResponseT } from "@/types/apiResponse";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({}) {},
  },
  callbacks: {
    async signIn({ account, user, ...rest }) {
      if (!user?.email || !user?.name) return true;

      const formateUser = {
        email: user.email!,
        name: user.name!,
        image: user.image!,
      };

      const { data } = await axios.post<UpsertUserResponseT>(
        getBackendUrl(upsertUserApi),
        formateUser,
      );
      user.id = data.id || user.id;
      user.email = data.email || user.email;
      user.name = data.name || user.name;
      user.image = data.image || user.image;
      user.role = data.role || user.role;
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as any;
      }

      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },
  ...authProvidersConfig,
  // debug: process.env.NODE_ENV === "development",
});
