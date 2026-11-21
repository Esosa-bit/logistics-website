import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface RegisterValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const IS_MOCK = true;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9 ()-]{7,20}$/;

const emptyValues: RegisterValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

// ⚠️ MOCK: replace with a real request (e.g. POST /auth/register).
// The backend must hash the password (bcrypt or argon2) and never return it.
// Demo tip: the email "taken@example.com" triggers the error message.
async function registerRequest(
  values: Pick<RegisterValues, "fullName" | "email" | "phone" | "password">,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (values.email.toLowerCase() === "taken@example.com") {
    throw new Error("An account with this email already exists.");
  }
}

// Validation here is for user experience only. The server must check again.
function validateRegister(values: RegisterValues): RegisterErrors {
  const errors: RegisterErrors = {};
  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number, e.g. +234 800 000 0001.";
  }
  if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  } else if (!/[A-Za-z]/.test(values.password) || !/[0-9]/.test(values.password)) {
    errors.password = "Password must include at least one letter and one number.";
  }
  if (values.confirmPassword !== values.password) {
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

export default function RegisterPage() {
  const [values, setValues] = useState<RegisterValues>(emptyValues);
  const [errors, setErrors] = useState<RegisterErrors>({});
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

    const validation = validateRegister(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    try {
      // confirmPassword is only for the page; it is never sent to the server.
      await registerRequest({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      });
      setValues(emptyValues); // clears the form, including passwords
      setSuccessMessage("Account created (demo only). You can now log in.");
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
        <h1 className="mb-1 text-left text-2xl font-bold text-gray-900">
          Create your account
        </h1>
        <p className="mb-4 text-left text-gray-500">
          Book and track deliveries in one place.
        </p>

        {IS_MOCK && (
          <p role="note" className="mb-4 rounded-md bg-yellow-50 p-3 text-left text-sm text-yellow-800">
            Demo mode: nothing is sent to a server. Use the email
            “taken@example.com” to see the error message.
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
            id="fullName"
            name="fullName"
            label="Full name"
            value={values.fullName}
            onChange={handleChange}
            error={errors.fullName}
            autoComplete="name"
          />
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
            id="phone"
            name="phone"
            label="Phone number"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            autoComplete="tel"
          />
          <Field
            id="password"
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
            hint="At least 8 characters, with a letter and a number."
          />
          <Field
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
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
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        {/* TODO: replace <a> with <Link to="..."> once React Router exists */}
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}