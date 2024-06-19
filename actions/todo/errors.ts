import { ActionError } from "@/lib/client";

export class LoginRequiredError extends ActionError {
  constructor() {
    super("only logged in users can do this action.");
  }
}
