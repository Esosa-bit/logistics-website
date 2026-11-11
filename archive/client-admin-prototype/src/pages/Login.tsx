import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAVY = "#0B1F4D";
const ORANGE = "#F97316";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ??
    "/admin";

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const ok = await login(email.trim(), password);
    setSubmitting(false);

    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError("Invalid email or password.");
    }
  }

  const inputStyle: React.CSSProperties = {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 15,
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${NAVY} 0%, #14306e 100%)`,
        padding: 16,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#fff",
          color: "#111",
          padding: 28,
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          borderTop: `5px solid ${ORANGE}`,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>
            <span style={{ color: NAVY }}>Visionary</span>{" "}
            <span style={{ color: ORANGE }}>Logistics</span>
          </h1>
          <div
            style={{
              width: 48,
              height: 4,
              borderRadius: 2,
              background: ORANGE,
              marginTop: 8,
            }}
          />
        </div>

        <p style={{ margin: 0, color: "#6b7280" }}>Sign in to the admin panel</p>

        {error && (
          <p
            style={{
              margin: 0,
              color: "#b91c1c",
              background: "#fee2e2",
              padding: "8px 12px",
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            {error}
          </p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: 12,
            background: ORANGE,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 700,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: 13,
            color: NAVY,
            fontStyle: "italic",
          }}
        >
          Fast • Reliable • Trusted
        </p>
      </form>
    </div>
  );
}