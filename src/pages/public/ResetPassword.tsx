import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface ResetValues {
  newPassword: string;
  confirmPassword: string;
}
type ResetErrors = Partial<Record<keyof ResetValues, string>>;

const IS_MOCK = true;
const emptyValues: ResetValues = { newPassword: "", confirmPassword: "" };

// ⚠️ MOCK: replace with a real request (e.g. POST /auth/reset-password).
// The backend must check the token is valid, unused and not expired,
// then hash the new password. Demo tip: open the page with ?token=expired
// to see the invalid-link message.
async function resetPasswordRequest(token: string, newPassword: string): Promise<void> {
  void newPassword; // mock: the password is deliberately not stored or logged
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (token === "expired") {
    throw new Error("This reset link is invalid or has expired.");
  }
}

// Validation here is for user experience only. The server must check again.
function validateReset(values: ResetValues): ResetErrors {
  const errors: ResetErrors = {};
  if (values.newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters.";
  } else if (!/[A-Za-z]/.test(values.newPassword) || !/[0-9]/.test(values.newPassword)) {
    errors.newPassword = "Password must include at least one letter and one number.";
  }
  if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
  hint?: string;
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  error,
  autoComplete,
  hint,
}: FieldProps) {
  const messageId = `${id}-message`;
  return (
    <div className="text-left">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={`w-full rounded-md border px-3 py-2 text-gray-900 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {(error || hint) && (
        <p
          id={messageId}
          className={`mt-1 text-sm ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  // The reset link looks like /reset-password?token=abc123.
  // TODO: once React Router exists, use useSearchParams() instead.
  const token = new URLSearchParams(window.location.search).get("token");

  const [values, setValues] = useState<ResetValues>(emptyValues);
  const [errors, setErrors] = useState<ResetErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMessage(null);

    const validation = validateReset(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    try {
      await resetPasswordRequest(token ?? "demo-token", values.newPassword);
      setValues(emptyValues); // clear passwords from memory
      setSuccessMessage("Your password has been reset (demo only). You can now log in.");
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Without a token (outside demo mode) the link is unusable.
  if (!IS_MOCK && !token) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-6 text-left text-red-700">
          <p className="font-semibold">This reset link is invalid or has expired.</p>
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Request a new link
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-left text-2xl font-bold text-gray-900">
          Reset your password
        </h1>
        <p className="mb-4 text-left text-gray-500">Choose a new password.</p>

        {IS_MOCK && (
          <p role="note" className="mb-4 rounded-md bg-yellow-50 p-3 text-left text-sm text-yellow-800">
            Demo mode: nothing is sent to a server. Add “?token=expired” to the
            address to see the error message.
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
          <Field
            id="newPassword"
            name="newPassword"
            label="New password"
            type="password"
            value={values.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            autoComplete="new-password"
            hint="At least 8 characters, with a letter and a number."
          />
          <Field
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? "Resetting…" : "Reset password"}
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