import { NavLink, Outlet } from "react-router-dom";
import CustomerProviders from "../customer/CustomerProviders";

export default function CustomerLayout() {
  return (
    <CustomerProviders>
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
            <span className="font-bold text-blue-900">Visionary Logistics</span>
            <NavLink
              to="/customer/shipments"
              className={({ isActive }) =>
                isActive ? "font-semibold text-orange-600" : "text-gray-600 hover:text-gray-900"
              }
            >
              My Shipments
            </NavLink>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">
          <Outlet />
        </main>
      </div>
    </CustomerProviders>
  );
}