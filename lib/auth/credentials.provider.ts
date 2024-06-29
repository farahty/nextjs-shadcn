import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { users } from "@/db/auth";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import * as bcrypt from "bcrypt";

export const CredentialsProvider = Credentials({
  credentials: {
    email: {
      type: "email",
    },
    password: {
      type: "password",
    },
  },
  async authorize({ email, password }, request) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, (email as string) ?? ""))
      .then((res) => res[0] ?? null);

    if (!user) {
      throw new CredentialsSignin("user not found");
    }

    if (!(typeof password === "string")) {
      throw new CredentialsSignin("password is not string");
    }

    if (!(typeof user.password === "string")) {
      throw new CredentialsSignin("user do'nt have a password");
    }

    const matched = await bcrypt.compare(password, user.password!);

    if (!matched) {
      throw new CredentialsSignin("wrong password");
    }

    return user;
  },
});
