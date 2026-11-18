import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageContainer } from "../../components/layout/PageContainer";
import { AlertMessage } from "../../components/ui/AlertMessage";
import { Button } from "../../components/ui/button";
import { FormField } from "../../components/ui/FormField";
import { Spinner } from "../../components/ui/spinner";
import { useCreateRider, useRiders, useSetRiderStatus, useUpdateRider } from "../../hooks/useRiders";
import { riderSchema, type RiderFormValues } from "../../schemas/rider.schema";
import type { Rider } from "../../types/shipments";

// ---------- Add / edit form ----------
function RiderForm({ editing, onDone }: { editing: Rider | null; onDone: () => void }) {
  const createMutation = useCreateRider();
  const updateMutation = useUpdateRider();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RiderFormValues>({
    resolver: zodResolver(riderSchema),
    defaultValues: { fullName: editing?.fullName ?? "", phone: editing?.phone ?? "" },
  });

  const onSubmit = (values: RiderFormValues) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, ...values }, { onSuccess: onDone });
    } else {
      createMutation.mutate(values, { onSuccess: () => reset() }); // clear the form after adding
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const errorMessage = createMutation.error?.message ?? updateMutation.error?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-xl space-y-4 rounded border p-4">
      <h2 className="text-lg font-semibold">{editing ? `Edit ${editing.fullName}` : "Add a rider"}</h2>

      <FormField label="Full name" autoComplete="off" error={errors.fullName?.message} {...register("fullName")} />
      <FormField label="Phone" autoComplete="off" error={errors.phone?.message} {...register("phone")} />

      {errorMessage && (
        <AlertMessage variant="error" title="Could not save rider">
          {errorMessage}
        </AlertMessage>
      )}
      {!editing && createMutation.isSuccess && (
        <p role="status" className="text-sm text-green-700">
          Rider added.
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" loading={isSaving}>
          {isSaving ? "Saving…" : editing ? "Save changes" : "Add rider"}
        </Button>
        {editing && (
          <button type="button" onClick={onDone} className="rounded border px-4 py-2">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// ---------- The page ----------
export default function ManageRiders() {
  const { data: riders, isLoading, isError, error } = useRiders();
  const statusMutation = useSetRiderStatus();
  const [editing, setEditing] = useState<Rider | null>(null);

  const onToggleStatus = (rider: Rider) => {
    const next: Rider["status"] = rider.status === "active" ? "inactive" : "active";
    const question =
      next === "inactive"
        ? `Deactivate ${rider.fullName}? They will no longer be offered for new deliveries.`
        : `Reactivate ${rider.fullName}?`;
    if (window.confirm(question)) {
      statusMutation.mutate({ id: rider.id, status: next });
    }
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold">Manage riders</h1>
      <p className="mt-2">Add and edit delivery staff. Riders are deactivated, never deleted.</p>

      <div className="mt-6">
        {/* key re-creates the form when switching between "add" and a specific rider */}
        <RiderForm key={editing?.id ?? "new"} editing={editing} onDone={() => setEditing(null)} />
      </div>

      <div className="mt-8" aria-live="polite">
        {statusMutation.isError && (
          <AlertMessage variant="error" title="Could not change rider status">
            {statusMutation.error?.message}
          </AlertMessage>
        )}

        {isLoading && <Spinner label="Loading riders…" className="size-5" />}

        {isError && (
          <AlertMessage variant="error" title="Could not load riders">
            {error?.message}
          </AlertMessage>
        )}

        {riders && riders.length === 0 && (
          <p className="rounded border border-dashed p-6 text-center">No riders yet. Add the first one above.</p>
        )}

        {riders && riders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider) => (
                  <tr key={rider.id} className="border-b">
                    <td className="p-2">{rider.fullName}</td>
                    <td className="p-2">{rider.phone}</td>
                    <td className="p-2">{rider.status === "active" ? "Active" : "Inactive"}</td>
                    <td className="space-x-2 p-2">
                      <button
                        type="button"
                        onClick={() => setEditing(rider)}
                        aria-label={`Edit ${rider.fullName}`}
                        className="rounded border px-3 py-1"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleStatus(rider)}
                        disabled={statusMutation.isPending}
                        aria-label={`${rider.status === "active" ? "Deactivate" : "Reactivate"} ${rider.fullName}`}
                        className="rounded border px-3 py-1 disabled:opacity-50"
                      >
                        {rider.status === "active" ? "Deactivate" : "Reactivate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageContainer>
  );
}