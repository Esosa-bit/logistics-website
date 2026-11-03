import { createContext, useContext, useState, type ReactNode } from "react";

export type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

// Sample notifications. Replace with data from the API later.
const INITIAL: Notification[] = [
  {
    id: 1,
    title: "Shipment delivered",
    message: "VL-1005 was delivered to Lagos.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "New shipment created",
    message: "VL-1008 to Enugu is waiting to be dispatched.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Shipment in transit",
    message: "VL-1007 is on its way to Kano.",
    time: "Yesterday",
    read: true,
  },
];

type NotificationsContextType = {
  notifications: Notification[];
  unreadCount: number;
  markRead: (id: number) => void;
  markAllRead: () => void;
};

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markRead, markAllRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error("useNotifications must be used inside <NotificationsProvider>");
  }
  return ctx;
}