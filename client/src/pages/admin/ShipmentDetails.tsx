import { Link, useNavigate, useParams } from "react-router-dom";
import { useShipments, type Status } from "../../hooks/useShipments";

export default function ShipmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shipments, loading, demoMode, error, updateStatus, removeShipment } =
    useShipments();

  const shipment = shipments.find((s) => s.id === id);

  async function handleDelete() {
    if (!id || !window.confirm(`Delete shipment ${id}?`)) return;
    const ok = await removeShipment(id);
    if (ok) navigate("/admin/shipments");
  }

  return (
    <div style={{ padding: 24, maxWidth: 560 }}>
      <Link to="/admin/shipments">← Back to shipments</Link>
      <h1 style={{ marginBottom: 16, color: "#0b1f4d" }}>Shipment {id}</h1>

      {demoMode && (
        <p
          style={{
            background: "#fff7ed",
            color: "#9a3412",
            border: "1px solid #fed7aa",
            padding: "8px 12px",
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          Demo mode: sample data is shown.
        </p>
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}
      {!loading && !shipment && <p>Shipment not found.</p>}

      {shipment && (
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 20,
            display: "grid",
            gap: 12,
            boxShadow: "0 4px 14px rgba(11, 31, 77, 0.08)",
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Shipment ID</div>
            <div>{shipment.id}</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Destination</div>
            <div>{shipment.destination}</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Date created</div>
            <div>{shipment.date}</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>Status</div>
            <select
              value={shipment.status}
              onChange={(e) => updateStatus(shipment.id, e.target.value as Status)}
              style={{ padding: 6 }}
            >
              <option>Pending</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>
          </div>

          <button
            onClick={handleDelete}
            style={{
              justifySelf: "start",
              padding: "8px 16px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Delete shipment
          </button>
        </div>
      )}
    </div>
  );
}