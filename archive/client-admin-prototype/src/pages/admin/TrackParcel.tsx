import { useState } from "react";
import { Link } from "react-router-dom";
import { useShipments, type Status } from "../../hooks/useShipments";

const STEPS: Status[] = ["Pending", "In Transit", "Delivered"];

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 14,
  padding: 20,
  boxShadow: "0 4px 14px rgba(11, 31, 77, 0.08)",
};

export default function TrackParcel() {
  const { shipments, loading } = useShipments();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("");

  const result = shipments.find(
    (s) => s.id.toLowerCase() === searched.trim().toLowerCase()
  );
  const currentStep = result ? STEPS.indexOf(result.status) : -1;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearched(query);
  }

  return (
    <div style={{ padding: 24, maxWidth: 700 }}>
      <h1 style={{ marginTop: 0, color: "#0b1f4d" }}>Track a Parcel</h1>
      <p style={{ color: "#4b5563" }}>
        Enter a tracking ID to see where a shipment is.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tracking ID, e.g. VL-1001"
          style={{ padding: 12, flex: 1, minWidth: 0 }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            background: "#0b1f4d",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Track
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {!loading && searched && !result && (
        <div style={card}>
          <strong>No shipment found</strong> for "{searched}". Check the ID and try
          again.
        </div>
      )}

      {result && (
        <div style={card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>Tracking ID</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#0b1f4d" }}>
                {result.id}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>Destination</div>
              <div style={{ fontWeight: 600 }}>{result.destination}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>Date created</div>
              <div style={{ fontWeight: 600 }}>{result.date}</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {STEPS.map((step, i) => {
              const done = i <= currentStep;
              return (
                <div
                  key={step}
                  style={{ flex: 1, textAlign: "center", position: "relative" }}
                >
                  {i > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: 15,
                        right: "50%",
                        width: "100%",
                        height: 4,
                        background: i <= currentStep ? "#f97316" : "#e5e7eb",
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: "relative",
                      width: 34,
                      height: 34,
                      margin: "0 auto",
                      borderRadius: "50%",
                      background: done ? "#f97316" : "#e5e7eb",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    {done ? "✔" : i + 1}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      fontWeight: done ? 700 : 400,
                      color: done ? "#0b1f4d" : "#9ca3af",
                    }}
                  >
                    {step}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 24 }}>
            <Link to={`/admin/shipments/${result.id}`} style={{ color: "#f97316", fontWeight: 700 }}>
              View full details →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}