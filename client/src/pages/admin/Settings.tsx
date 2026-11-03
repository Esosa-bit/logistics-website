import { useState } from "react";

const KEY = "vl_settings";
const DEMO_KEY = "vl_demo_shipments";

type SettingsData = { emailAlerts: boolean; smsAlerts: boolean };

const DEFAULT: SettingsData = { emailAlerts: true, smsAlerts: false };

function load(): SettingsData {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? { ...DEFAULT, ...JSON.parse(saved) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsData>(load);
  const [message, setMessage] = useState("");

  function toggle(field: keyof SettingsData) {
    const next = { ...settings, [field]: !settings[field] };
    setSettings(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
    setMessage("Settings saved.");
  }

  function clearDemoData() {
    if (!window.confirm("Reset the demo shipments back to the sample data?")) return;
    try {
      localStorage.removeItem(DEMO_KEY);
    } catch {
      // ignore storage errors
    }
    setMessage("Demo data cleared. Refresh the page to load the sample shipments again.");
  }

  const row: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "14px 0",
    borderBottom: "1px solid #eef0f4",
  };

  return (
    <div style={{ padding: 24, maxWidth: 560 }}>
      <h1 style={{ marginTop: 0, color: "#0b1f4d" }}>Settings</h1>

      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: "6px 20px 20px",
          boxShadow: "0 4px 14px rgba(11, 31, 77, 0.08)",
        }}
      >
        <label style={row}>
          <span>
            <strong>Email alerts</strong>
            <br />
            <span style={{ color: "#6b7280", fontSize: 14 }}>
              Get an email when a shipment status changes.
            </span>
          </span>
          <input
            type="checkbox"
            checked={settings.emailAlerts}
            onChange={() => toggle("emailAlerts")}
            style={{ width: 20, height: 20 }}
          />
        </label>

        <label style={row}>
          <span>
            <strong>SMS alerts</strong>
            <br />
            <span style={{ color: "#6b7280", fontSize: 14 }}>
              Get a text message for urgent updates.
            </span>
          </span>
          <input
            type="checkbox"
            checked={settings.smsAlerts}
            onChange={() => toggle("smsAlerts")}
            style={{ width: 20, height: 20 }}
          />
        </label>

        <div style={{ paddingTop: 16 }}>
          <strong>Demo data</strong>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 10px" }}>
            Clears shipments saved in this browser while the server is not connected.
          </p>
          <button onClick={clearDemoData} style={{ padding: "8px 14px", cursor: "pointer" }}>
            Reset demo data
          </button>
        </div>

        {message && <p style={{ color: "#047857", marginBottom: 0 }}>{message}</p>}
      </div>

      <p style={{ color: "#9ca3af", fontSize: 13 }}>
        These settings are saved in this browser only. They will move to the server
        when the backend supports them.
      </p>
    </div>
  );
}