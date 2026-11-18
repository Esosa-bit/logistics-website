
export const RIDER_ROUTES = {
  dashboard: "/rider/dashboard", // reuses your existing "/rider/dashboard"
  deliveries: '/rider/deliveries',
  details: '/rider/details',
  status: '/rider/status',
  proof: '/rider/proof',
  history: '/rider/history',
  notifications: '/rider/notifications',
  profile: '/rider/profile',
  help: '/rider/help',
} as const;

// withId(RIDER_ROUTES.details, 'VL-20481') -> "/rider/details/VL-20481"
export const withId = (path: string, id?: string | number) => { return `${path}/${id}`;};