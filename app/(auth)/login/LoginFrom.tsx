"use client";

import ReCaptchaField from "@/components/fields/ReCaptchaField";
import TextField from "@/components/fields/TextField";
import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as login from "@/actions/auth/login";
import { useAction } from "next-safe-action/hooks";
import {
  CredentialsLogin,
  credentialsLoginSchema,
} from "@/actions/auth/schema";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const LoginFrom = () => {
  const params = useSearchParams();

  const form = useForm<CredentialsLogin>({
    resolver: zodResolver(credentialsLoginSchema),
  });

  const { execute } = useAction(login.credentialsLogin, {
    onError: (er) => {
      toast("Error", { description: er.error.serverError });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(execute)}
        className="flex flex-col space-y-2"
      >
        <TextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
        />
        <TextField
          control={form.control}
          name="password"
          label="Password"
          type="password"
        />

        <input
          type="hidden"
          defaultValue={
            params.has("callbackUrl") ? params.get("callbackUrl") ?? "/" : "/"
          }
          {...form.register("callbackUrl")}
        />
        <ReCaptchaField control={form.control} name="reCaptcha" />
        <Button className="w-full">Login &rarr;</Button>
      </form>
    </Form>
  );
};

export default LoginFrom;
