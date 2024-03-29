import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

export const {
  handlers: { GET, POST },
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],

  callbacks: {
    async session({ session }) {
      return session;
    },
  },
});
