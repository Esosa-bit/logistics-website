import { Link } from "react-router-dom";
import { useShipments, type Status } from "../../hooks/useShipments";
import "./AdminDashboard.css";

const badgeStyle: Record<Status, { background: string; color: string }> = {
  "In Transit": { background: "#dbeafe", color: "#1d4ed8" },
  Delivered: { background: "#d1fae5", color: "#047857" },
  Pending: { background: "#ffedd5", color: "#c2410c" },
};

export default function AdminDashboard() {
  const { shipments, loading, demoMode, error } = useShipments();

  const count = (status: Status) =>
    shipments.filter((s) => s.status === status).length;

  const stats = [
    { label: "Total Shipments", value: shipments.length, icon: "📦", color: "navy" },
    { label: "In Transit", value: count("In Transit"), icon: "🚚", color: "orange" },
    { label: "Delivered", value: count("Delivered"), icon: "✔", color: "navy" },
    { label: "Pending", value: count("Pending"), icon: "⏱", color: "orange" },
  ];

  const recent = shipments.slice(0, 5);

  return (
    <div className="dash">
      <h1 className="dash-title">Welcome back, Admin!</h1>
      <p className="dash-sub">Here's what's happening with your deliveries today.</p>
      <div className="dash-underline" />

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
          Demo mode: the server is not reachable, so sample data is shown.
        </p>
      )}

      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          <div className="dash-stats">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                <div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="dash-grid">
            <section className="panel">
              <div className="panel-head">
                <span>📦 Recent Deliveries</span>
                <Link to="/admin/shipments" className="panel-link">
                  View All →
                </Link>
              </div>

              <div className="table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Tracking ID</th>
                      <th>Destination</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <Link to={`/admin/shipments/${s.id}`}>{s.id}</Link>
                        </td>
                        <td>{s.destination}</td>
                        <td>
                          <span className="badge" style={badgeStyle[s.status]}>
                            {s.status}
                          </span>
                        </td>
                        <td>{s.date}</td>
                      </tr>
                    ))}
                    {recent.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center" }}>
                          No shipments yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="panel">
              <div className="panel-head">
                <span>⚡ Quick Actions</span>
              </div>
              <div className="panel-body">
                <Link to="/admin/shipments" className="btn navy">
                  📦 Manage Shipments
                </Link>
                <Link to="/admin/shipments" className="btn orange">
                  ＋ Add Shipment
                </Link>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}