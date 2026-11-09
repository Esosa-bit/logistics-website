import type { ContactFormValues } from "../schemas/contact.schema";

/**
 * MOCK SERVICE.
 * This does NOT send an email, does NOT save the enquiry, and does NOT contact
 * any server. It only waits a moment and then reports success, so the form's
 * loading and success states can be built and demonstrated.
 *
 * Do not log the form values: they contain personal details.
 *
 * When the backend contract is agreed, replace the body of this function with a
 * real request. The page only depends on this function's signature
 * (values in, a promise out), so it will not need to change.
 */
export async function sendContactMessage(
  values: ContactFormValues,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Reserved test value: a subject of exactly "simulate error" shows the error state.
  if (values.subject.toLowerCase() === "simulate error") {
    throw new Error("Simulated failure");
  }
}
