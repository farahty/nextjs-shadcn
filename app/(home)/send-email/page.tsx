"use client";

import { SendMail, sendMail } from "@/actions/email";
import { mailerSchema } from "@/actions/email/validation";
import { findUsers } from "@/actions/users";
import EditorField from "@/components/fields/EditorField";
import MultiSelectField from "@/components/fields/MultiSelectField";
import TextField from "@/components/fields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAction } from "next-safe-action/hooks";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SendMailPage = () => {
  const form = useForm<SendMail>({
    resolver: zodResolver(mailerSchema),

    defaultValues: {
      body: "",
      users: [],
      subject: "",
    },
  });

  const {
    execute: filterUsers,
    result: filterResults,
    status: filterStatus,
  } = useAction(findUsers);

  const { execute, status } = useAction(sendMail, {
    onSuccess: () => {
      form.reset();
      toast("Email", { description: "Email was sent successfully" });
    },
    onError: (er) => {
      toast("Error", { description: er.error.serverError });
    },
  });

  const handleSearch = useCallback(
    (keyword: string) => {
      filterUsers({ keyword });
    },
    [filterUsers]
  );

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(execute)}
          className="mt-4 flex flex-col gap-3"
        >
          <MultiSelectField
            disabled={status === "executing"}
            name="users"
            control={form.control}
            onSearch={handleSearch}
            loading={filterStatus === "executing"}
            placeholder="To"
            items={filterResults.data ?? []}
          />
          <TextField
            control={form.control}
            name="subject"
            placeholder="Subject"
            disabled={status === "executing"}
          />

          <EditorField
            control={form.control}
            name="body"
            valueType="html"
            disabled={status === "executing"}
          />

          <div className="py-2">
            <Button type="submit" loading={status === "executing"}>
              Send
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default SendMailPage;
