import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

/* ------------------------------------------------------------------ */
/* 1. TYPES                                                            */
/* ------------------------------------------------------------------ */

interface Profile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type ProfileErrors = Partial<Record<keyof Profile, string>>;
type PasswordErrors = Partial<Record<keyof PasswordForm, string>>;

interface Notice {
  type: "success" | "error";
  text: string;
}

/* ------------------------------------------------------------------ */
/* 2. MOCK DATA: NOT REAL. Remove when the backend API exists.         */
/* ------------------------------------------------------------------ */

const IS_MOCK = true;

const mockProfile: Profile = {
  fullName: "Ada Okafor",
  email: "ada.okafor@example.com",
  phone: "+234 800 000 0001",
  address: "12 Example Street, Ikeja, Lagos",
};

// ⚠️ MOCK: pretends to be network requests.
// When the backend exists, replace these with real requests
// (for example GET /me, PATCH /me, POST /me/password).
// The backend must identify the customer from their login session,
// NEVER from an id sent by the page.
async function fetchProfile(): Promise<Profile> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { ...mockProfile };
}

async function saveProfile(updated: Profile): Promise<Profile> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ...updated, email: mockProfile.email }; // email can't be changed here
}

async function changePassword(form: PasswordForm): Promise<void> {
  void form; // mock: the password is deliberately not stored or logged anywhere
  await new Promise((resolve) => setTimeout(resolve, 600));
}

/* ------------------------------------------------------------------ */
/* 3. VALIDATION (UX only: the server must check everything again)     */
/* ------------------------------------------------------------------ */

function validateProfile(values: Profile): ProfileErrors {
  const errors: ProfileErrors = {};
  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (!/^\+?[0-9 ()-]{7,20}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number, e.g. +234 800 000 0001.";
  }
  if (values.address.trim().length === 0) {
    errors.address = "Enter your address.";
  } else if (values.address.trim().length > 200) {
    errors.address = "Address must be 200 characters or fewer.";
  }
  return errors;
}

function validatePassword(values: PasswordForm): PasswordErrors {
  const errors: PasswordErrors = {};
  if (values.currentPassword.length === 0) {
    errors.currentPassword = "Enter your current password.";
  }
  if (values.newPassword.length < 8) {
    errors.newPassword = "New password must be at least 8 characters.";
  } else if (values.newPassword === values.currentPassword) {
    errors.newPassword = "New password must be different from the current one.";
  }
  if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
}

/* ------------------------------------------------------------------ */
/* 4. SMALL COMPONENTS (only used inside this file)                    */
/* ------------------------------------------------------------------ */

interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  disabled?: boolean;
  autoComplete?: string;
  hint?: string;
}

function TextField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  disabled = false,
  autoComplete,
  hint,
}: TextFieldProps) {
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
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={`w-full rounded-md border px-3 py-2 text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 ${
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

function NoticeMessage({ notice }: { notice: Notice | null }) {
  if (!notice) return null;
  return (
    <p
      role={notice.type === "error" ? "alert" : "status"}
      className={`rounded-md p-3 text-left text-sm ${
        notice.type === "error"
          ? "bg-red-50 text-red-700"
          : "bg-green-50 text-green-700"
      }`}
    >
      {notice.text}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* 5. THE PAGE                                                         */
/* ------------------------------------------------------------------ */

const emptyPasswordForm: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function MyProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Profile editing
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Profile | null>(null);
  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [profileNotice, setProfileNotice] = useState<Notice | null>(null);

  // Password change
  const [passwordForm, setPasswordForm] = useState<PasswordForm>(emptyPasswordForm);
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState<Notice | null>(null);

  useEffect(() => {
    // If the page closes before the answer arrives, ignore the late answer.
    let isCancelled = false;

    fetchProfile()
      .then((result) => {
        if (isCancelled) return;
        setProfile(result);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (isCancelled) return;
        setLoadError(err instanceof Error ? err.message : "Something went wrong");
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  function startEditing() {
    if (!profile) return;
    setDraft({ ...profile }); // edit a COPY so Cancel can simply discard it
    setProfileErrors({});
    setProfileNotice(null);
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
    setDraft(null);
    setProfileErrors({});
  }

  function handleProfileChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDraft((previous) => (previous ? { ...previous, [name]: value } : previous));
  }

  async function handleSaveProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!draft) return;

    const validation = validateProfile(draft);
    setProfileErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSaving(true);
    setProfileNotice(null);
    try {
      const updated = await saveProfile(draft);
      setProfile(updated);
      setIsEditing(false);
      setDraft(null);
      setProfileNotice({ type: "success", text: "Profile updated." });
    } catch {
      setProfileNotice({
        type: "error",
        text: "We couldn’t save your changes. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPasswordForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleChangePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validatePassword(passwordForm);
    setPasswordErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsChangingPassword(true);
    setPasswordNotice(null);
    try {
      await changePassword(passwordForm);
      setPasswordForm(emptyPasswordForm); // clear passwords from memory
      setPasswordNotice({ type: "success", text: "Password changed." });
    } catch {
      setPasswordNotice({
        type: "error",
        text: "We couldn’t change your password. Check your current password and try again.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  }

  // 1. Loading
  if (isLoading) {
    return (
      <p role="status" className="p-6 text-gray-500">
        Loading profile…
      </p>
    );
  }

  // 2. Error
  if (loadError) {
    return (
      <div role="alert" className="p-6 text-red-700">
        <p className="font-semibold">We couldn’t load your profile.</p>
        <p>{loadError}</p>
      </div>
    );
  }

  // 3. Empty
  if (!profile) {
    return <p className="p-6 text-gray-500">No profile data available.</p>;
  }

  // 4. Success
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
      <header className="text-left">
        <h1 className="text-2xl font-bold text-gray-900">My profile</h1>
        <p className="text-gray-500">View and update your account details.</p>
      </header>

      {IS_MOCK && (
        <p
          role="note"
          className="rounded-md bg-yellow-50 p-3 text-left text-sm text-yellow-800"
        >
          Demo mode: this page uses sample data. Changes are not saved to a
          server.
        </p>
      )}

      {/* ---------------- Profile details ---------------- */}
      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal information
          </h2>
          {!isEditing && (
            <button
              type="button"
              onClick={startEditing}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Edit profile
            </button>
          )}
        </div>

        <NoticeMessage notice={profileNotice} />

        {isEditing && draft ? (
          // noValidate: we show our own messages instead of the browser's
          <form onSubmit={handleSaveProfile} noValidate className="mt-4 space-y-4">
            <TextField
              id="fullName"
              name="fullName"
              label="Full name"
              value={draft.fullName}
              onChange={handleProfileChange}
              error={profileErrors.fullName}
              autoComplete="name"
            />
            <TextField
              id="email"
              name="email"
              label="Email address"
              type="email"
              value={draft.email}
              onChange={handleProfileChange}
              disabled
              hint="Email can’t be changed here."
            />
            <TextField
              id="phone"
              name="phone"
              label="Phone number"
              type="tel"
              value={draft.phone}
              onChange={handleProfileChange}
              error={profileErrors.phone}
              autoComplete="tel"
            />
            <TextField
              id="address"
              name="address"
              label="Address"
              value={draft.address}
              onChange={handleProfileChange}
              error={profileErrors.address}
              autoComplete="street-address"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {isSaving ? "Saving…" : "Save changes"}
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                disabled={isSaving}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <dl className="mt-4 grid gap-4 text-left sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-500">Full name</dt>
              <dd className="font-medium text-gray-900">{profile.fullName}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Email address</dt>
              <dd className="font-medium text-gray-900">{profile.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Phone number</dt>
              <dd className="font-medium text-gray-900">{profile.phone}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Address</dt>
              <dd className="font-medium text-gray-900">{profile.address}</dd>
            </div>
          </dl>
        )}
      </section>

      {/* ---------------- Change password ---------------- */}
      {/* Keep this section ONLY if the backend supports password change. */}
      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-left text-lg font-semibold text-gray-900">
          Change password
        </h2>

        <NoticeMessage notice={passwordNotice} />

        <form
          onSubmit={handleChangePassword}
          noValidate
          className="mt-4 space-y-4"
        >
          <TextField
            id="currentPassword"
            name="currentPassword"
            label="Current password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.currentPassword}
            autoComplete="current-password"
          />
          <TextField
            id="newPassword"
            name="newPassword"
            label="New password"
            type="password"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.newPassword}
            autoComplete="new-password"
            hint="At least 8 characters."
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.confirmPassword}
            autoComplete="new-password"
          />
          <button
            type="submit"
            disabled={isChangingPassword}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isChangingPassword ? "Changing…" : "Change password"}
          </button>
        </form>
      </section>
    </main>
  );
}