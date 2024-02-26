"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import TextField from "./fields/TextField";
import DateField from "./fields/DateField";

const registerSchema = z.object({
  firstName: z.string().min(4),
  secondName: z.string(),
  dob: z.date(),
});

export default function () {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
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
