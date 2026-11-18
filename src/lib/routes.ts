// ONE place for every route path. Never type '/track' by hand elsewhere.
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  track: "/track",
  contact: "/contact",
  register: "/register",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  //Dashboard routes
  adminDashboard: "/admin/dashboard",
  customerDashboard: "/customer/dashboard",
  riderDashboard: "/rider/dashboard",
  //Customer routes
  CustomerDashboard: "/customer/dashboard",
  bookDelivery: "/customer/BookDelivery",
  myShipments: "/customer/Myshipments",
  myPayments: "/customer/payments",
  myProfile: "/customer/profile",
  adminUpdateShipmentStatus: "/admin/shipments/status",
  adminCustomers: "/admin/customers",
  adminRiders: "/admin/riders",
} as const;

export const NAV_LINKS = [
  { label: "Home", to: ROUTES.home },
  { label: "About", to: ROUTES.about },
  { label: "Services", to: ROUTES.services },
  { label: "Track shipment", to: ROUTES.track },
  { label: "Contact", to: ROUTES.contact },
] as const;
