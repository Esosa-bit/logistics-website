import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const IS_MOCK = true;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ⚠️ MOCK: replace with a real request (e.g. POST /auth/forgot-password).
// The backend should email a single-use link that expires quickly.
async function requestPasswordReset(email: string): Promise<void> {
  void email; // mock: nothing is sent anywhere
  await new Promise((resolve) => setTimeout(resolve, 800));
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMessage(null);

    // Validation here is for user experience only. The server must check again.
    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError(null);

    setIsSubmitting(true);
    try {
      await requestPasswordReset(email.trim());
      // Always the same message, whether or not the email has an account,
      // so attackers can't discover which emails are registered.
      setSuccessMessage(
        "If an account exists for that email, we’ve sent instructions to reset your password.",
      );
    } catch {
      setSubmitError("We couldn’t send the request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-left text-2xl font-bold text-gray-900">
          Forgot your password?
        </h1>
        <p className="mb-4 text-left text-gray-500">
          Enter your email and we’ll send you a link to reset it.
        </p>

        {IS_MOCK && (
          <p role="note" className="mb-4 rounded-md bg-yellow-50 p-3 text-left text-sm text-yellow-800">
            Demo mode: no email is actually sent.
          </p>
        )}

        {submitError && (
          <p role="alert" className="mb-4 rounded-md bg-red-50 p-3 text-left text-sm text-red-700">
            {submitError}
          </p>
        )}
        {successMessage && (
          <p role="status" className="mb-4 rounded-md bg-green-50 p-3 text-left text-sm text-green-700">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="text-left">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? "email-message" : undefined}
              className={`w-full rounded-md border px-3 py-2 text-gray-900 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {emailError && (
              <p id="email-message" className="mt-1 text-sm text-red-600">
                {emailError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Send reset link"}
          </button>
        </form>

        {/* TODO: replace <a> with <Link to="..."> once React Router exists */}
        <p className="mt-4 text-sm text-gray-600">
          <a href="/login" className="text-blue-600 hover:underline">
            Back to log in
          </a>
        </p>
      </div>
    </main>
  );
}