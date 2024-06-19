import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { users } from "@/db/auth";
import { eq } from "drizzle-orm";
import { db } from "@/db";

export const CredentialsProvider = Credentials({
  credentials: {
    email: {},
    password: {},
  },
  async authorize({ email }, request) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, (email as string) ?? ""))
      .then((res) => res[0] ?? null);

    if (!user) {
      throw new CredentialsSignin("user not found");
    }

    return user;
  },
});
