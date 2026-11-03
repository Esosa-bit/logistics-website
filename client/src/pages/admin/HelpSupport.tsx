import { useState, type FormEvent } from "react";

const faqs = [
  { q: "How do I add a shipment?", a: "Go to Shipments, enter a destination, and click Add." },
  { q: "How do I change a shipment's status?", a: "Use the status dropdown in the shipments table." },
  { q: "How do I track a parcel?", a: "Open Track Parcel and enter the tracking ID, for example VL-1001." },
  { q: "Who do I contact for urgent issues?", a: "Send a message with the form below." },
];

export default function HelpSupport() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  }

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <h1 style={{ marginTop: 0, color: "#0b1f4d" }}>Help & Support</h1>

      <div style={{ background: "#fff", borderRadius: 14, padding: 20, marginBottom: 20 }}>
        <h2 style={{ marginTop: 0, color: "#0b1f4d", fontSize: 20 }}>FAQs</h2>
        {faqs.map((f) => (
          <details key={f.q} style={{ padding: "10px 0", borderBottom: "1px solid #eef0f4" }}>
            <summary style={{ cursor: "pointer", fontWeight: 600, color: "#0b1f4d" }}>{f.q}</summary>
            <p style={{ margin: "8px 0 0", color: "#4b5563" }}>{f.a}</p>
          </details>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 14, padding: 20 }}>
        <h2 style={{ marginTop: 0, color: "#0b1f4d", fontSize: 20 }}>Contact support</h2>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setSent(false);
          }}
          rows={5}
          placeholder="Describe your issue"
          style={{ display: "block", width: "100%", padding: 10, marginBottom: 14 }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 24px",
            background: "#f97316",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Send message
        </button>
        {sent && <p style={{ color: "#047857" }}>Message sent (demo only).</p>}
      </form>
    </div>
  );
}