"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import React, { FC, useCallback, useEffect } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

import { CheckCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";

export type ReCaptchaButton = {
  onChange: (token: string) => void;
  value: string;
  action?: string;
  placeholder?: string;
};

const ReCaptchaButton: FC<ReCaptchaButton> = ({
  onChange,
  value,
  action,
  placeholder,
}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha(action ?? "GetReCaptchaToken");
    onChange(token);
  }, [executeRecaptcha, onChange, action]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <Button
      aria-label="ReCaptcha"
      variant="ghost"
      className="flex items-center space-x-1 pl-0 "
    >
      {!value || (value && value.length < 10) ? (
        <Loader2 className="animate-spin h-6 w-6" />
      ) : (
        <CheckCircle className=" h-6 w-6 text-primary" />
      )}

      <span>{placeholder ?? `I\'m not a robot`}</span>
    </Button>
  );
};

const ReCaptchaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,

  label,
  description,
  placeholder,
  action,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label?: string;
  description?: string;
  placeholder?: string;
  action?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            >
              <ReCaptchaButton
                value={field.value}
                onChange={field.onChange}
                action={action}
                placeholder={placeholder}
              />
            </GoogleReCaptchaProvider>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  );
};

export default ReCaptchaField;
