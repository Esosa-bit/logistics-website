import { useNotifications } from "../../context/NotificationsContext";

export default function Notifications() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();

  return (
    <div style={{ padding: 24, maxWidth: 700 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0, color: "#0b1f4d" }}>Notifications</h1>
        <button
          onClick={markAllRead}
          disabled={unreadCount === 0}
          style={{ padding: "8px 14px", cursor: unreadCount === 0 ? "default" : "pointer" }}
        >
          Mark all as read
        </button>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markRead(n.id)}
            style={{
              display: "flex",
              gap: 12,
              padding: 16,
              borderRadius: 12,
              background: "#fff",
              borderLeft: `5px solid ${n.read ? "#e5e7eb" : "#f97316"}`,
              boxShadow: "0 2px 8px rgba(11, 31, 77, 0.06)",
              cursor: "pointer",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: n.read ? 500 : 800, color: "#0b1f4d" }}>
                {n.title}
              </div>
              <div style={{ color: "#4b5563", marginTop: 2 }}>{n.message}</div>
              <div style={{ color: "#9ca3af", fontSize: 13, marginTop: 6 }}>{n.time}</div>
            </div>
            {!n.read && (
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#f97316",
                  marginTop: 6,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}