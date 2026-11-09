import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { SAMPLE_SHIPMENTS } from "../data/sampleShipments";

export type Status = "Pending" | "In Transit" | "Delivered";

export type Shipment = {
  id: string;
  destination: string;
  status: Status;
  date: string;
};

const DEMO_KEY = "vl_demo_shipments";
const JSON_HEADERS = { "Content-Type": "application/json" };

function loadDemo(): Shipment[] {
  try {
    const saved = localStorage.getItem(DEMO_KEY);
    return saved ? (JSON.parse(saved) as Shipment[]) : SAMPLE_SHIPMENTS;
  } catch {
    return SAMPLE_SHIPMENTS;
  }
}

function saveDemo(list: Shipment[]) {
  try {
    localStorage.setItem(DEMO_KEY, JSON.stringify(list));
  } catch {
    // ignore storage errors
  }
}

function nextId(list: Shipment[]) {
  const numbers = list.map((s) => parseInt(s.id.replace("VL-", ""), 10) || 0);
  const max = numbers.length ? Math.max(...numbers) : 1000;
  return `VL-${max + 1}`;
}

export function useShipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/shipments`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Shipment[]) => {
        if (cancelled) return;
        setShipments(data);
        setDemoMode(false);
      })
      .catch(() => {
        if (cancelled) return;
        setShipments(loadDemo());
        setDemoMode(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function addShipment(destination: string): Promise<boolean> {
    setError("");

    if (demoMode) {
      const created: Shipment = {
        id: nextId(shipments),
        destination,
        status: "Pending",
        date: new Date().toISOString().slice(0, 10),
      };
      const next = [created, ...shipments];
      setShipments(next);
      saveDemo(next);
      return true;
    }

    try {
      const res = await fetch(`${API_URL}/shipments`, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify({ destination }),
      });
      if (!res.ok) throw new Error();
      const created: Shipment = await res.json();
      setShipments((prev) => [created, ...prev]);
      return true;
    } catch {
      setError("Could not add shipment.");
      return false;
    }
  }

  async function updateStatus(id: string, status: Status): Promise<boolean> {
    setError("");

    if (demoMode) {
      const next = shipments.map((s) => (s.id === id ? { ...s, status } : s));
      setShipments(next);
      saveDemo(next);
      return true;
    }

    try {
      const res = await fetch(`${API_URL}/shipments/${id}`, {
        method: "PATCH",
        headers: JSON_HEADERS,
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      const updated: Shipment = await res.json();
      setShipments((prev) => prev.map((s) => (s.id === id ? updated : s)));
      return true;
    } catch {
      setError("Could not update status.");
      return false;
    }
  }

  async function removeShipment(id: string): Promise<boolean> {
    setError("");

    if (demoMode) {
      const next = shipments.filter((s) => s.id !== id);
      setShipments(next);
      saveDemo(next);
      return true;
    }

    try {
      const res = await fetch(`${API_URL}/shipments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setShipments((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch {
      setError("Could not delete shipment.");
      return false;
    }
  }

  function resetDemo() {
    setShipments(SAMPLE_SHIPMENTS);
    saveDemo(SAMPLE_SHIPMENTS);
  }

  return {
    shipments,
    loading,
    demoMode,
    error,
    addShipment,
    updateStatus,
    removeShipment,
    resetDemo,
  };
}