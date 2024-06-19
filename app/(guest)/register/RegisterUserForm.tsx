"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as users from "@/actions/users";
import { DBUserInput, userZodSchema } from "@/db/auth";
import { useAction } from "next-safe-action/hooks";
import { Form } from "@/components/ui/form";
import TextField from "@/components/fields/TextField";
import { Button } from "@/components/ui/button";

function RegisterForm() {
  const form = useForm<DBUserInput>({
    resolver: zodResolver(userZodSchema.input),
  });

  const { execute, status, result } = useAction(users.register, {
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(execute)}
        className="grid grid-cols-1 gap-2 w-full"
        method="POST"
      >
        <pre>{JSON.stringify({ result, status }, null, 2)}</pre>
        <TextField
          control={form.control}
          name="name"
          label="Name"
          disabled={status === "executing"}
        />
        <TextField
          control={form.control}
          name="email"
          label="Email"
          disabled={status === "executing"}
        />
        <TextField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          disabled={status === "executing"}
        />

        <TextField
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          disabled={status === "executing"}
        />
        <Button
          type="submit"
          disabled={status === "executing"}
          loading={status === "executing"}
        >
          Register
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
