"use server";

import { signIn } from "@/lib/auth";
import { action } from "@/lib/client";

import {
  credentialsLoginSchema,
  emailLoginSchema,
  socialLoginSchema,
} from "./schema";

export const credentialsLogin = action
  .schema(credentialsLoginSchema)
  .action(async ({ parsedInput }) => {
    await signIn("credentials", {
      email: parsedInput.email,
      password: parsedInput.password,
      redirectTo: "/",
    });
  });

export const socialLogin = action
  .schema(socialLoginSchema)
  .action(async ({ parsedInput }) => {
    await signIn(parsedInput.provider, { redirectTo: "/" });
  });

export const emailLogin = action
  .schema(emailLoginSchema)
  .action(async () => {});
