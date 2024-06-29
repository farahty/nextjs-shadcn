import { z } from "zod";
import { zfd } from "zod-form-data";

export const credentialsLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  reCaptcha: z.string(),
});

export type CredentialsLogin = z.infer<typeof credentialsLoginSchema>;

export const socialLoginSchema = zfd.formData({
  provider: zfd.text(z.enum(["google", "github"])),
});

export type SocialLogin = z.infer<typeof socialLoginSchema>;

export const emailLoginSchema = z.object({
  email: z.string().email(),
  reCaptcha: z.string(),
});

export type EmailLogin = z.infer<typeof emailLoginSchema>;
