import { ActionError } from "@/lib/client";

export class EmailIsUsedError extends ActionError {
  constructor() {
    super("email already used");
  }
}
