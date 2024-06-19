import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import React from "react";
import MultiSelect, { Item } from "../ui/multi-select";

const MultiSelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TItem extends Item = Item
>({
  control,
  name,
  label,
  description,
  items,
  placeholder,
  getLabel,
  loading,
  onSearch,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label?: string;
  description?: string;
  items: TItem[];

  onSearch?: (search: string) => void;
  loading?: boolean;
  placeholder?: string;
  getLabel?: (item: TItem) => string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultiSelect
              selected={field.value}
              onSelect={field.onChange}
              items={items}
              getLabel={getLabel}
              loading={loading}
              onSearch={onSearch}
              placeholder={placeholder}
              {...field}
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

export default MultiSelectField;
