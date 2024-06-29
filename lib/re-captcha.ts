"use server";

import axios from "axios";
import { ActionError } from "./client";

export const validateReCaptcha = async (token: string) => {
  const validationFormData = `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

  const response = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    validationFormData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (response.data.success) {
    if (response.data.score < 0.5) {
      console.error("ReCaptcha verification failed:", response.data);
      throw new ActionError("ReCaptcha verification failed", {
        cause: response.data,
      });
    }
  } else {
    throw new ActionError("ReCaptcha verification failed");
  }
};
