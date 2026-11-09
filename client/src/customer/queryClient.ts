import { QueryClient } from "@tanstack/react-query";

// One client for the customer section. Created here, outside any component,
// so the cache survives re-renders.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // the default is 3 retries, which makes error states slow to appear
    },
  },
});