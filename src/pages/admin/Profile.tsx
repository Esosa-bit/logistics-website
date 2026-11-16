import { useState } from "react";

const KEY = "vl_profile";

type ProfileData = { name: string; email: string; phone: string };

const DEFAULT: ProfileData = {
  name: "Admin",
  email: "admin@visionary.com",
  phone: "",
};

function load(): ProfileData {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? { ...DEFAULT, ...JSON.parse(saved) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>(load);
  const [saved, setSaved] = useState(false);

  function update(field: keyof ProfileData, value: string) {
    setProfile({ ...profile, [field]: value });
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      localStorage.setItem(KEY, JSON.stringify(profile));
    } catch {
      // ignore storage errors
    }
    setSaved(true);
  }

  const input: React.CSSProperties = { padding: 10, width: "100%" };
  const label: React.CSSProperties = { fontSize: 13, color: "#6b7280", marginBottom: 4 };

  return (
    <div style={{ padding: 24, maxWidth: 520 }}>
      <h1 style={{ marginTop: 0, color: "#0b1f4d" }}>Profile</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 20,
          display: "grid",
          gap: 14,
          boxShadow: "0 4px 14px rgba(11, 31, 77, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#0b1f4d",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            {profile.name.trim().charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <div style={{ fontWeight: 800, color: "#0b1f4d" }}>{profile.name || "Admin"}</div>
            <div style={{ color: "#6b7280", fontSize: 14 }}>Administrator</div>
          </div>
        </div>

        <div>
          <div style={label}>Full name</div>
          <input
            style={input}
            value={profile.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>

        <div>
          <div style={label}>Email</div>
          <input
            style={input}
            type="email"
            value={profile.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </div>

        <div>
          <div style={label}>Phone</div>
          <input
            style={input}
            value={profile.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+234..."
          />
        </div>

        <button
          type="submit"
          style={{
            padding: 12,
            background: "#f97316",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Save changes
        </button>

        {saved && <p style={{ margin: 0, color: "#047857" }}>Profile saved (demo, in this browser).</p>}
      </form>
    </div>
  );
}