import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import React from "react";

const TextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  type,
  label,
  description,
  placeholder,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label?: string;
  description?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              autoComplete="off"
              placeholder={placeholder}
              aria-label={name}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  );
};

export default TextField;
