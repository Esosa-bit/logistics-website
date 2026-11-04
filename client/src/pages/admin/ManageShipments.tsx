import { useState } from "react";
import { Link } from "react-router-dom";
import { useShipments, type Status } from "../../hooks/useShipments";

export default function ManageShipments() {
  const {
    shipments,
    loading,
    demoMode,
    error,
    addShipment,
    updateStatus,
    removeShipment,
    resetDemo,
  } = useShipments();

  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("");

  const filtered = shipments.filter(
    (s) =>
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.destination.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!destination.trim()) return;
    const ok = await addShipment(destination.trim());
    if (ok) setDestination("");
  }

  async function handleDelete(id: string) {
    if (!window.confirm(`Delete shipment ${id}?`)) return;
    await removeShipment(id);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0, marginBottom: 16, color: "#0b1f4d" }}>
        Manage Shipments
      </h1>

      {demoMode && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            background: "#fff7ed",
            color: "#9a3412",
            border: "1px solid #fed7aa",
            padding: "8px 12px",
            borderRadius: 8,
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          <span>
            Demo mode: the server is not reachable. Changes are saved in this
            browser only.
          </span>
          <button onClick={resetDemo} style={{ padding: "4px 12px", cursor: "pointer" }}>
            Reset sample data
          </button>
        </div>
      )}

      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="New shipment destination"
          style={{ padding: 10, flex: 1, minWidth: 0 }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 18px",
            background: "#f97316",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by ID or destination"
        style={{ padding: 10, width: "100%", marginBottom: 16 }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ overflowX: "auto", background: "#fff", borderRadius: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
            <thead>
              <tr style={{ textAlign: "left", background: "#e8edf7", color: "#0b1f4d" }}>
                <th style={{ padding: 12 }}>ID</th>
                <th style={{ padding: 12 }}>Destination</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Date</th>
                <th style={{ padding: 12 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} style={{ borderTop: "1px solid #eef0f4" }}>
                  <td style={{ padding: 12 }}>
                    <Link to={`/admin/shipments/${s.id}`}>{s.id}</Link>
                  </td>
                  <td style={{ padding: 12 }}>{s.destination}</td>
                  <td style={{ padding: 12 }}>
                    <select
                      value={s.status}
                      onChange={(e) => updateStatus(s.id, e.target.value as Status)}
                    >
                      <option>Pending</option>
                      <option>In Transit</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                  <td style={{ padding: 12 }}>{s.date}</td>
                  <td style={{ padding: 12 }}>
                    <button onClick={() => handleDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 16, textAlign: "center" }}>
                    No shipments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}