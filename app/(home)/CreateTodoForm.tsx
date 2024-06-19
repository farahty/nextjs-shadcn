"use client";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";

import { TodoInput, todoZodSchema } from "@/db/todo";
import { zodResolver } from "@hookform/resolvers/zod";

import * as todos from "@/actions/todo";
import { useEffect } from "react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import TextField from "@/components/fields/TextField";
import { Button } from "@/components/ui/button";

const CreateTodoForm = () => {
  const form = useForm<TodoInput>({
    resolver: zodResolver(todoZodSchema.input),
    defaultValues: {
      text: "",
      isCompleted: false,
      userId: "",
    },
  });

  const { execute, status } = useAction(todos.create, {
    onSuccess: () => {
      form.resetField("text");
      form.setFocus("text");
    },
    onError: (er) => {
      toast("Error", { description: er.error.serverError });
    },
  });

  useEffect(() => {
    form.setFocus("text");
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className="flex flex-col">
        <TextField
          defaultValue=""
          disabled={status === "executing"}
          control={form.control}
          name="text"
        />

        <span className="my-3 self-end flex gap-3 items-center">
          {status === "executing" && <Loader2 className="animate-spin" />}

          <Button type="submit" disabled={status === "executing"}>
            Create
          </Button>
        </span>
      </form>
    </Form>
  );
};

export default CreateTodoForm;
