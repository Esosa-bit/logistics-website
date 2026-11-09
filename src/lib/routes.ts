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
} as const;

export const NAV_LINKS = [
  { label: "Home", to: ROUTES.home },
  { label: "About", to: ROUTES.about },
  { label: "Services", to: ROUTES.services },
  { label: "Track shipment", to: ROUTES.track },
  { label: "Contact", to: ROUTES.contact },
] as const;
