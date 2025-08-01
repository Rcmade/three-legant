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
      if (!user?.email || !user?.name) return false;

      const formateUser = {
        email: user.email!,
        name: user.name!,
        image: user.image!,
      };
      const { data } = await axios.post<UpsertUserResponseT>(
        getBackendUrl(upsertUserApi),
        formateUser,
        {
          withCredentials: true,
        },
      );
      user.id = data.id || user.id;
      user.email = data.email || user.email;
      user.name = data.name || user.name;
      user.image = data.image || user.image;
      user.role = data.role || user.role;

      console.dir(
        { signIn: { account, user, rest } },
        {
          depth: Infinity,
          colors: true,
        },
      );

      return true;
    },
    async session({ session, token, ...rest }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as any;
      }

      if (session.user) {
        session.user.email = token?.email as string;
        session.user.name = token?.name as string;
        session.user.isOAuth = token?.isOAuth as boolean;
      }
      session.user.role = token.role as any;
      return session;
    },
    async jwt({ token, trigger, user, account, ...rest }) {
      if (!token.email) return token;

      if (trigger === "signIn" || trigger === "update") {
        if (user?.role) {
          token.role = user?.role as any;
        }
      }
      // token.email = user?.email as string;
      // token.name = user?.name as string;
      // token.role = user?.role as any;
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },

  ...authProvidersConfig,

  // cookies: {
  //   sessionToken: {
  //     options: {
  //       sameSite: false,
  //       httpOnly: false,
  //       secure: false,
  //     },
  //   },
  // },
  // debug: process.env.NODE_ENV === "development",
});
