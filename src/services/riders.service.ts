import type { Rider } from "../types/shipments";

const USE_MOCK: boolean = true;
const delay = (ms = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// ---------- MOCK DATA (delete when the backend is connected) ----------
const mockRiders: Rider[] = [
  {
    id: "r1",
    fullName: "Musa Ibrahim",
    phone: "+234 801 000 0001",
    status: "active",
  },
  {
    id: "r2",
    fullName: "Segun Adebayo",
    phone: "+234 801 000 0002",
    status: "active",
  },
  {
    id: "r3",
    fullName: "Ifeanyi Obi",
    phone: "+234 801 000 0003",
    status: "inactive",
  },
];
// ----------------------------------------------------------------------

export async function listRiders(): Promise<Rider[]> {
  if (USE_MOCK) {
    await delay();
    return mockRiders.map((r) => ({ ...r }));
  }
  // REAL: see Section 8.
  throw new Error("Real API not connected yet");
}

export interface CreateRiderInput {
  fullName: string;
  phone: string;
}

export async function createRider(input: CreateRiderInput): Promise<Rider> {
  if (USE_MOCK) {
    await delay();
    if (mockRiders.some((r) => r.phone === input.phone)) {
      throw new Error("A rider with this phone number already exists");
    }
    const rider: Rider = {
      id: crypto.randomUUID(),
      ...input,
      status: "active",
    };
    mockRiders.push(rider);
    return { ...rider };
  }
  throw new Error("Real API not connected yet");
}

export interface UpdateRiderInput extends CreateRiderInput {
  id: string;
}

export async function updateRider(input: UpdateRiderInput): Promise<Rider> {
  if (USE_MOCK) {
    await delay();
    const rider = mockRiders.find((r) => r.id === input.id);
    if (!rider) throw new Error("Rider not found");
    if (mockRiders.some((r) => r.id !== input.id && r.phone === input.phone)) {
      throw new Error("A rider with this phone number already exists");
    }
    rider.fullName = input.fullName;
    rider.phone = input.phone;
    return { ...rider };
  }
  throw new Error("Real API not connected yet");
}

export interface SetRiderStatusInput {
  id: string;
  status: Rider["status"]; // "active" | "inactive"
}

export async function setRiderStatus(
  input: SetRiderStatusInput,
): Promise<Rider> {
  if (USE_MOCK) {
    await delay();
    const rider = mockRiders.find((r) => r.id === input.id);
    if (!rider) throw new Error("Rider not found");
    rider.status = input.status;
    return { ...rider };
  }
  throw new Error("Real API not connected yet");
}
