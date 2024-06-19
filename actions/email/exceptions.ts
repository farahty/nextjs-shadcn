import { ActionError } from "@/lib/client";

export class FarahtyOrganizationError extends ActionError {
  constructor() {
    super("Only members of Farahty organization can send emails");
  }
}
