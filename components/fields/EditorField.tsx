"use client";

import dynamic from "next/dynamic";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import Editor from "../ui/editor";

//const Editor = dynamic(() => import("../ui/editor"), { ssr: true });

const EditorField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  placeholder,
  valueType,
  className,
  defaultValue,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label?: string;
  description?: string;
  valueType?: "json" | "html" | "md";
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              className={cn(
                "rounded-md border border-input bg-background min-h-14 px-3 py-2 text-sm ring-offset-background",
                className
              )}
            >
              <Editor
                value={field.value}
                onChange={field.onChange}
                valueType={valueType}
                defaultValue={defaultValue}
              />
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  );
};

export default EditorField;
