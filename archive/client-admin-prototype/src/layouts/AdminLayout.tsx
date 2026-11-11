import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  NotificationsProvider,
  useNotifications,
} from "../context/NotificationsContext";
import "./AdminLayout.css";

const links = [
  { to: "/admin", label: "Dashboard", icon: "🏠", end: true, badge: false },
  { to: "/admin/shipments", label: "Shipments", icon: "📦", end: false, badge: false },
  { to: "/admin/track", label: "Track Parcel", icon: "📍", end: false, badge: false },
  { to: "/admin/profile", label: "Profile", icon: "👤", end: false, badge: false },
  { to: "/admin/notifications", label: "Notifications", icon: "🔔", end: false, badge: true },
  { to: "/admin/settings", label: "Settings", icon: "⚙️", end: false, badge: false },
  { to: "/admin/support", label: "Help & Support", icon: "💬", end: false, badge: false },
];

function AdminShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
        <h2 className="admin-brand">
          Visionary
          <span>Logistics</span>
        </h2>

        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <span>{l.icon}</span>
            {l.label}
            {l.badge && unreadCount > 0 && (
              <span className="admin-badge">{unreadCount}</span>
            )}
          </NavLink>
        ))}

        <div className="admin-spacer" />

        <button className="admin-logout" onClick={handleLogout}>
          <span>🚪</span>
          Logout
        </button>
      </aside>

      <div
        className={`admin-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className="admin-content">
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              className="admin-menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <span>Admin Panel</span>
          </div>

          <div className="admin-header-right">
            <NavLink to="/admin/notifications" className="admin-bell" aria-label="Notifications">
              🔔
              {unreadCount > 0 && <span className="admin-bell-dot">{unreadCount}</span>}
            </NavLink>

            <div className="admin-user">
              <div className="admin-avatar">A</div>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <NotificationsProvider>
      <AdminShell />
    </NotificationsProvider>
  );
}