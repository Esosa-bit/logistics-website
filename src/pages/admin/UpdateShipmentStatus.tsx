import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageContainer } from "../../components/layout/PageContainer";
import { AlertMessage } from "../../components/ui/AlertMessage";
import { Button } from "../../components/ui/button";
import { FormField } from "../../components/ui/FormField";
import { Spinner } from "../../components/ui/spinner";
import { useShipmentSearch, useUpdateShipmentStatus } from "../../hooks/useShipmentStatusUpdate";
import {
  STATUS_LABELS,
  getAllowedNextStatuses,
  isReasonRequired,
  isSkippingSteps,
} from "../../lib/shipmentStatus";
import {
  shipmentSearchSchema,
  statusUpdateSchema,
  type ShipmentSearchValues,
  type StatusUpdateValues,
} from "../../schemas/shipmentStatus.schema";
import type { Shipment } from "../../types/shipments";

// ---------- The update form ----------
interface StatusFormProps {
  shipment: Shipment;
  isSaving: boolean;
  onSubmit: (values: StatusUpdateValues) => void;
}

function StatusForm({ shipment, isSaving, onSubmit }: StatusFormProps) {
  const allowed = getAllowedNextStatuses(shipment.status);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StatusUpdateValues>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: { status: allowed[0], location: "", description: "" },
  });

  const selected = watch("status"); // re-renders when the dropdown changes
  const skipping = isSkippingSteps(shipment.status, selected);
  const reasonNeeded = isReasonRequired(selected);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          New status
        </label>
        <select id="status" {...register("status")} className="mt-1 w-full rounded border p-2">
          {allowed.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        {skipping && (
          <p className="mt-1 text-sm text-amber-700">
            Warning: this skips one or more steps in the normal delivery flow.
          </p>
        )}
      </div>

      <FormField
        label="Location (optional)"
        autoComplete="off"
        error={errors.location?.message}
        {...register("location")}
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          {reasonNeeded ? "Reason (required)" : "Note (optional)"}
        </label>
        <textarea
          id="description"
          rows={3}
          {...register("description")}
          className="mt-1 w-full rounded border p-2"
        />
        {errors.description && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" loading={isSaving}>
        {isSaving ? "Saving…" : "Update status"}
      </Button>
    </form>
  );
}

// ---------- The page ----------
export default function UpdateShipmentStatus() {
  const [searched, setSearched] = useState("");
  const { data: shipment, isLoading, isError, error } = useShipmentSearch(searched);
  // The mutation lives in the page so its success/error messages survive
  // when the form below is re-created after an update.
  const updateMutation = useUpdateShipmentStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShipmentSearchValues>({
    resolver: zodResolver(shipmentSearchSchema),
    defaultValues: { trackingNumber: "" },
  });

  const onSearch = (values: ShipmentSearchValues) => {
    updateMutation.reset(); // clear old messages
    setSearched(values.trackingNumber.toUpperCase());
  };

  const onUpdate = (values: StatusUpdateValues) => {
    if (!shipment) return;
    updateMutation.mutate({
      shipmentId: shipment.id,
      status: values.status,
      location: values.location || undefined, // send nothing instead of ""
      description: values.description || undefined,
    });
  };

  const notFound = searched !== "" && !isLoading && !isError && shipment === null;

  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold">Update shipment status</h1>
      <p className="mt-2">Find a shipment by tracking number, then record its latest status.</p>

      <form onSubmit={handleSubmit(onSearch)} noValidate className="mt-6 max-w-xl space-y-4">
        <FormField
          label="Tracking number"
          placeholder="VL-2026-00125"
          autoComplete="off"
          hint="Demo numbers: VL-2026-00125 to VL-2026-00128"
          error={errors.trackingNumber?.message}
          {...register("trackingNumber")}
        />
        <Button type="submit" loading={isLoading}>
          {isLoading ? "Searching…" : "Search"}
        </Button>
      </form>

      <div aria-live="polite" className="mt-8 space-y-6">
        {isLoading && <Spinner label="Looking up the shipment…" className="size-5" />}

        {isError && (
          <AlertMessage variant="error" title="Could not search">
            {error?.message}
          </AlertMessage>
        )}

        {notFound && (
          <AlertMessage variant="warning" title="Shipment not found">
            No shipment matches “{searched}”. Check the number and try again.
          </AlertMessage>
        )}

        {shipment && (
          <section className="space-y-6">
            <div className="rounded border p-4">
              <p className="text-lg font-semibold">{shipment.trackingNumber}</p>
              <p>
                {shipment.origin} to {shipment.destination}
              </p>
              <p>Customer: {shipment.customerName}</p>
              {shipment.riderName && <p>Rider: {shipment.riderName}</p>}
              {/* Status is shown as TEXT, not colour alone (accessibility) */}
              <p>
                Current status: <strong>{STATUS_LABELS[shipment.status]}</strong>
              </p>
            </div>

            {updateMutation.isSuccess && (
              <p role="status" className="text-sm text-green-700">
                Status updated successfully.
              </p>
            )}
            {updateMutation.isError && (
              <AlertMessage variant="error" title="Could not update status">
                {updateMutation.error?.message}
              </AlertMessage>
            )}

            {getAllowedNextStatuses(shipment.status).length === 0 ? (
              <p className="rounded bg-gray-100 p-3">
                This shipment is <strong>{STATUS_LABELS[shipment.status]}</strong>, which is a final status
                and cannot be changed.
              </p>
            ) : (
              // key re-creates the form (fresh defaults) after each successful update
              <StatusForm
                key={`${shipment.id}-${shipment.status}`}
                shipment={shipment}
                isSaving={updateMutation.isPending}
                onSubmit={onUpdate}
              />
            )}

            <div>
              <h2 className="mb-2 text-lg font-semibold">Tracking history</h2>
              <ul className="space-y-2">
                {shipment.history.map((event, index) => (
                  <li key={`${event.timestamp}-${index}`} className="rounded border p-3">
                    <p className="font-medium">{STATUS_LABELS[event.status]}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(event.timestamp).toLocaleString("en-GB")}
                      {event.location ? `, ${event.location}` : ""}
                    </p>
                    <p className="text-sm">{event.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </PageContainer>
  );
}