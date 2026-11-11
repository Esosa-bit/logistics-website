import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: "linear-gradient(135deg, #0b1f4d 0%, #14306e 100%)",
        color: "#fff",
        padding: 24,
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: 72, color: "#f97316" }}>404</h1>
      <p style={{ margin: 0, fontSize: 18 }}>This page does not exist.</p>
      <Link
        to="/admin"
        style={{
          marginTop: 16,
          padding: "12px 24px",
          background: "#f97316",
          color: "#fff",
          borderRadius: 8,
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Go to the dashboard
      </Link>
    </div>
  );
}