import { QueryClient } from "@tanstack/react-query";

// One client for the whole app. Created here, outside any component.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // default is 3 retries with waits, which makes error states slow to appear
    },
  },
});