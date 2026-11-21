import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface LoginValues {
  email: string;
  password: string;
}
type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const IS_MOCK = true;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ⚠️ MOCK: replace with a real request (e.g. POST /auth/login) when the
// backend exists. The backend should set the login session in an httpOnly
// cookie. Never store passwords or tokens in localStorage.
// Demo tip: the password "wrongpass" triggers the error message.
async function loginRequest(values: LoginValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (values.password === "wrongpass") {
    // Same message whether the email or password is wrong, so attackers
    // can't discover which emails have accounts.
    throw new Error("Incorrect email or password.");
  }
}

// Validation here is for user experience only. The server must check again.
function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};
  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (values.password.length === 0) {
    errors.password = "Enter your password.";
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

export default function LoginPage() {
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // One handler for every input: "name" matches a key in `values`.
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMessage(null);

    const validation = validateLogin(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    try {
      await loginRequest({ email: values.email.trim(), password: values.password });
      setValues((previous) => ({ ...previous, password: "" })); // clear password
      // TODO: once React Router exists, navigate to the customer dashboard.
      setSuccessMessage("Logged in successfully (demo only).");
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-left text-2xl font-bold text-gray-900">Log in</h1>
        <p className="mb-4 text-left text-gray-500">
          Welcome back. Enter your details to continue.
        </p>

        {IS_MOCK && (
          <p role="note" className="mb-4 rounded-md bg-yellow-50 p-3 text-left text-sm text-yellow-800">
            Demo mode: nothing is sent to a server. Use the password
            “wrongpass” to see the error message.
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

        {/* noValidate: we show our own messages instead of the browser's */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Field
            id="email"
            name="email"
            label="Email address"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />
          <Field
            id="password"
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? "Logging in…" : "Log in"}
          </button>
        </form>

        {/* TODO: replace <a> with <Link to="..."> once React Router exists */}
        <p className="mt-4 text-sm text-gray-600">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot your password?
          </a>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          New here?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}