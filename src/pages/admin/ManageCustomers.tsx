import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageContainer } from "../../components/layout/PageContainer";
import { AlertMessage } from "../../components/ui/AlertMessage";
import { Button } from "../../components/ui/button";
import { FormField } from "../../components/ui/FormField";
import { Spinner } from "../../components/ui/spinner";
import {
  useCustomers,
  useCustomerShipments,
  useSetCustomerStatus,
  useUpdateCustomer,
} from "../../hooks/useCustomers";
import { STATUS_LABELS } from "../../lib/shipmentStatus";
import { customerEditSchema, type CustomerEditValues } from "../../schemas/customer.schema";
import type { Customer } from "../../types/shipments";

// ---------- Side panel: edit, suspend/reactivate, shipment history ----------
function CustomerPanel({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  const updateMutation = useUpdateCustomer();
  const statusMutation = useSetCustomerStatus();
  const shipmentsQuery = useCustomerShipments(customer.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerEditValues>({
    resolver: zodResolver(customerEditSchema),
    defaultValues: {
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
    },
  });

  const onSave = (values: CustomerEditValues) => {
    // reset(values) tells the form "these saved values are the new baseline"
    updateMutation.mutate({ id: customer.id, ...values }, { onSuccess: () => reset(values) });
  };

  const isSuspended = customer.status === "suspended";

  const onToggleStatus = () => {
    const next: Customer["status"] = isSuspended ? "active" : "suspended";
    const question = isSuspended
      ? `Reactivate ${customer.fullName}?`
      : `Suspend ${customer.fullName}? They will not be able to log in.`;
    if (window.confirm(question)) {
      statusMutation.mutate({ id: customer.id, status: next });
    }
  };

  return (
    <aside className="space-y-6 rounded border p-4" aria-label={`Details for ${customer.fullName}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold">{customer.fullName}</h2>
          {/* Status as text, not colour alone */}
          <p>
            Account status: <strong>{isSuspended ? "Suspended" : "Active"}</strong>
          </p>
        </div>
        <button type="button" onClick={onClose} className="rounded border px-3 py-1 text-sm">
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit(onSave)} noValidate className="space-y-4">
        <FormField label="Full name" autoComplete="off" error={errors.fullName?.message} {...register("fullName")} />
        <FormField label="Email" autoComplete="off" error={errors.email?.message} {...register("email")} />
        <FormField label="Phone" autoComplete="off" error={errors.phone?.message} {...register("phone")} />

        {updateMutation.isError && (
          <AlertMessage variant="error" title="Could not save changes">
            {updateMutation.error?.message}
          </AlertMessage>
        )}
        {updateMutation.isSuccess && (
          <p role="status" className="text-sm text-green-700">
            Changes saved.
          </p>
        )}

        <Button type="submit" loading={updateMutation.isPending}>
          {updateMutation.isPending ? "Saving…" : "Save changes"}
        </Button>
      </form>

      <div className="space-y-2 border-t pt-4">
        <h3 className="font-semibold">Account access</h3>
        {statusMutation.isError && (
          <AlertMessage variant="error" title="Could not change status">
            {statusMutation.error?.message}
          </AlertMessage>
        )}
        <button
          type="button"
          onClick={onToggleStatus}
          disabled={statusMutation.isPending}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          {statusMutation.isPending ? "Working…" : isSuspended ? "Reactivate customer" : "Suspend customer"}
        </button>
      </div>

      <div className="border-t pt-4">
        <h3 className="mb-2 font-semibold">Shipment history</h3>
        {shipmentsQuery.isLoading && <Spinner label="Loading shipments…" className="size-5" />}
        {shipmentsQuery.isError && (
          <AlertMessage variant="error" title="Could not load shipments">
            {shipmentsQuery.error?.message}
          </AlertMessage>
        )}
        {shipmentsQuery.data && shipmentsQuery.data.length === 0 && (
          <p className="text-gray-600">This customer has no shipments yet.</p>
        )}
        {shipmentsQuery.data && shipmentsQuery.data.length > 0 && (
          <ul className="space-y-2">
            {shipmentsQuery.data.map((s) => (
              <li key={s.trackingNumber} className="rounded border p-3">
                <p className="font-medium">{s.trackingNumber}</p>
                <p className="text-sm text-gray-600">
                  To {s.destination} · {STATUS_LABELS[s.status]} ·{" "}
                  {new Date(s.createdAt).toLocaleDateString("en-GB")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

// ---------- The page ----------
export default function ManageCustomers() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading, isError, error, isFetching } = useCustomers(search, page);

  // Find the selected customer in the CURRENT list, so edits show up after refetch
  const selected = data?.items.find((c) => c.id === selectedId) ?? null;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1); // a new search always starts on page 1
    setSelectedId(null);
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold">Manage customers</h1>
      <p className="mt-2">Search, edit, and suspend or reactivate customer accounts.</p>

      <form onSubmit={onSearch} className="mt-6 flex max-w-xl gap-2" role="search">
        <label htmlFor="customer-search" className="sr-only">
          Search customers by name, email, or phone
        </label>
        <input
          id="customer-search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name, email, or phone"
          className="w-full rounded border p-2"
        />
        <button type="submit" className="rounded bg-gray-800 px-4 py-2 text-white">
          Search
        </button>
      </form>

      <div className="mt-8 grid gap-6 lg:grid-cols-2" aria-live="polite">
        <div>
          {isLoading && <Spinner label="Loading customers…" className="size-5" />}

          {isError && (
            <AlertMessage variant="error" title="Could not load customers">
              {error?.message}
            </AlertMessage>
          )}

          {data && data.items.length === 0 && (
            <p className="rounded border border-dashed p-6 text-center">No customers match your search.</p>
          )}

          {data && data.items.length > 0 && (
            <>
              {/* overflow-x-auto lets the table scroll sideways on small screens */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((c) => (
                      <tr key={c.id} className="border-b">
                        <td className="p-2">{c.fullName}</td>
                        <td className="p-2">{c.email}</td>
                        <td className="p-2">{c.status === "suspended" ? "Suspended" : "Active"}</td>
                        <td className="p-2">
                          <button
                            type="button"
                            onClick={() => setSelectedId(c.id)}
                            aria-label={`View or edit ${c.fullName}`}
                            className="rounded border px-3 py-1"
                          >
                            View / edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page <= 1 || isFetching}
                  className="rounded border px-3 py-1 disabled:opacity-50"
                >
                  Previous
                </button>
                <p className="text-sm">
                  Page {page} of {totalPages} ({data.total} customers)
                </p>
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= totalPages || isFetching}
                  className="rounded border px-3 py-1 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        {/* key = customer id, so choosing another customer gives a fresh form */}
        {selected && <CustomerPanel key={selected.id} customer={selected} onClose={() => setSelectedId(null)} />}
      </div>
    </PageContainer>
  );
}