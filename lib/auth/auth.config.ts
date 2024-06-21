import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";

const BASE_PATH = "/api/auth";

export default {
  debug: true,
  trustHost: true,
  //basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [GitHub, Google],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
