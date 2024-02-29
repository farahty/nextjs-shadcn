"use client";

import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import TextField from "./fields/TextField";
import DateField from "./fields/DateField";
import { RegisterSchema, registerSchema } from "@/actions/users/schema";

export default function () {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
    },
  });

  function onSubmit(values: RegisterSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2"
      >
        <TextField control={form.control} name="firstName" label="First Name" />
        <TextField control={form.control} name="secondName" label="Last Name" />
        <DateField control={form.control} name="dob" label="Date Of Birth" />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
}
