import type { Customer, ShipmentStatus } from "../types/shipments";

const USE_MOCK: boolean = true;
const delay = (ms = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const CUSTOMERS_PAGE_SIZE = 5;

// What the customer panel shows for each shipment (a small summary, not everything)
export interface CustomerShipment {
  trackingNumber: string;
  destination: string;
  status: ShipmentStatus;
  createdAt: string;
}

export interface CustomerListParams {
  search: string;
  page: number; // starts at 1
}

export interface CustomerListResult {
  items: Customer[];
  total: number;
  page: number;
  pageSize: number;
}

// ---------- MOCK DATA (delete when the backend is connected) ----------
const mockCustomers: Customer[] = [
  {
    id: "c1",
    fullName: "Ada Okafor",
    email: "ada.okafor@example.com",
    phone: "+234 800 000 0001",
    status: "active",
    createdAt: "2026-09-01T10:00:00+01:00",
  },
  {
    id: "c2",
    fullName: "Chinedu Eze",
    email: "chinedu.eze@example.com",
    phone: "+234 800 000 0002",
    status: "active",
    createdAt: "2026-09-05T10:00:00+01:00",
  },
  {
    id: "c3",
    fullName: "Tunde Bello",
    email: "tunde.bello@example.com",
    phone: "+234 800 000 0003",
    status: "suspended",
    createdAt: "2026-09-12T10:00:00+01:00",
  },
  {
    id: "c4",
    fullName: "Chioma Eze",
    email: "chioma.eze@example.com",
    phone: "+234 800 000 0004",
    status: "active",
    createdAt: "2026-09-20T10:00:00+01:00",
  },
  {
    id: "c5",
    fullName: "Emeka Nwosu",
    email: "emeka.nwosu@example.com",
    phone: "+234 800 000 0005",
    status: "active",
    createdAt: "2026-10-02T10:00:00+01:00",
  },
  {
    id: "c6",
    fullName: "Fatima Sani",
    email: "fatima.sani@example.com",
    phone: "+234 800 000 0006",
    status: "active",
    createdAt: "2026-10-15T10:00:00+01:00",
  },
  {
    id: "c7",
    fullName: "Ngozi Adeyemi",
    email: "ngozi.adeyemi@example.com",
    phone: "+234 800 000 0007",
    status: "active",
    createdAt: "2026-11-01T10:00:00+01:00",
  },
];

const mockCustomerShipments: Record<string, CustomerShipment[]> = {
  c1: [
    {
      trackingNumber: "VL-2026-00125",
      destination: "Abuja",
      status: "booked",
      createdAt: "2026-11-16T09:00:00+01:00",
    },
    {
      trackingNumber: "VL-2026-00110",
      destination: "Kano",
      status: "delivered",
      createdAt: "2026-10-20T09:00:00+01:00",
    },
  ],
  c3: [
    {
      trackingNumber: "VL-2026-00126",
      destination: "Port Harcourt",
      status: "in_transit",
      createdAt: "2026-11-14T10:00:00+01:00",
    },
  ],
  c4: [
    {
      trackingNumber: "VL-2026-00127",
      destination: "Benin City",
      status: "delivered",
      createdAt: "2026-11-10T09:00:00+01:00",
    },
  ],
  c5: [
    {
      trackingNumber: "VL-2026-00128",
      destination: "Lagos",
      status: "exception",
      createdAt: "2026-11-13T09:00:00+01:00",
    },
  ],
};
// ----------------------------------------------------------------------

export async function listCustomers(
  params: CustomerListParams,
): Promise<CustomerListResult> {
  if (USE_MOCK) {
    await delay();
    const term = params.search.trim().toLowerCase();
    const filtered = mockCustomers.filter(
      (c) =>
        term === "" ||
        [c.fullName, c.email, c.phone].some((value) =>
          value.toLowerCase().includes(term),
        ),
    );
    const start = (params.page - 1) * CUSTOMERS_PAGE_SIZE;
    return {
      items: filtered
        .slice(start, start + CUSTOMERS_PAGE_SIZE)
        .map((c) => ({ ...c })),
      total: filtered.length,
      page: params.page,
      pageSize: CUSTOMERS_PAGE_SIZE,
    };
  }

  // REAL: GET the customer list with search + page (see Section 8).
  throw new Error("Real API not connected yet");
}

export interface UpdateCustomerInput {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export async function updateCustomer(
  input: UpdateCustomerInput,
): Promise<Customer> {
  if (USE_MOCK) {
    await delay();
    const customer = mockCustomers.find((c) => c.id === input.id);
    if (!customer) throw new Error("Customer not found");

    const emailTaken = mockCustomers.some(
      (c) =>
        c.id !== input.id &&
        c.email.toLowerCase() === input.email.toLowerCase(),
    );
    if (emailTaken)
      throw new Error("That email is already used by another customer");

    customer.fullName = input.fullName;
    customer.email = input.email;
    customer.phone = input.phone;
    return { ...customer };
  }

  throw new Error("Real API not connected yet");
}

export interface SetCustomerStatusInput {
  id: string;
  status: Customer["status"]; // "active" | "suspended"
}

export async function setCustomerStatus(
  input: SetCustomerStatusInput,
): Promise<Customer> {
  if (USE_MOCK) {
    await delay();
    const customer = mockCustomers.find((c) => c.id === input.id);
    if (!customer) throw new Error("Customer not found");
    customer.status = input.status;
    return { ...customer };
  }

  throw new Error("Real API not connected yet");
}

export async function getCustomerShipments(
  customerId: string,
): Promise<CustomerShipment[]> {
  if (USE_MOCK) {
    await delay();
    return [...(mockCustomerShipments[customerId] ?? [])];
  }

  throw new Error("Real API not connected yet");
}
