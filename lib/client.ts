import { CredentialsSignin } from "next-auth";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {}

export const action = createSafeActionClient({
  // Can also be an async function.
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    if (e instanceof CredentialsSignin) {
      return e.message;
    }

    return "Oh no, something went wrong!";
  },
});
