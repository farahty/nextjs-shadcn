import NextAuth, { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { CredentialsProvider } from "./credentials.provider";
import authConfig from "./auth.config";

const authOptions: NextAuthConfig = {
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db),
  providers: [
    ...authConfig.providers,
    CredentialsProvider,
    Resend({
      from: "no-replay@farahty.com",
    }),
  ],
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(authOptions);
