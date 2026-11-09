import type { RegisterFormValues } from "../schemas/register.schema";

// confirmPassword is only for the form; it is never sent anywhere.
export type RegistrationPayload = Omit<RegisterFormValues, "confirmPassword">;

// Thrown when the email is already registered. The page turns this into a field error.
export class DuplicateEmailError extends Error {}

/**
 * MOCK SERVICE.
 * This does NOT create an account, does NOT contact a server, does NOT start a
 * session and does NOT store the password anywhere (not in state, local storage,
 * session storage, cookies or the console).
 *
 * When the backend contract is agreed, replace the body with a real request.
 * The page only depends on this signature, so it will not need to change.
 * Never log `payload`: it contains a password.
 */
export async function registerCustomer(
  payload: RegistrationPayload,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Reserved test emails so you can see both failure states:
  const email = payload.email.toLowerCase();
  if (email === "taken@example.com") throw new DuplicateEmailError();
  if (email === "error@example.com") throw new Error("Simulated failure");
}
