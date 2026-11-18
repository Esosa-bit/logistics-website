import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getCustomerShipments,
  listCustomers,
  setCustomerStatus,
  updateCustomer,
} from "../services/customers.service";

export function useCustomers(search: string, page: number) {
  return useQuery({
    queryKey: ["customers", { search, page }],
    queryFn: () => listCustomers({ search, page }),
    // keep showing the old page while the next one loads (no flicker)
    placeholderData: keepPreviousData,
  });
}

export function useCustomerShipments(customerId: string) {
  return useQuery({
    queryKey: ["customer-shipments", customerId],
    queryFn: () => getCustomerShipments(customerId),
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomer,
    // refetch every cached customer list so the table shows the new values
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
  });
}

export function useSetCustomerStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setCustomerStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
  });
}
