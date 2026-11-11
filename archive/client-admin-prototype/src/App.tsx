import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageShipments from "./pages/admin/ManageShipments";
import ShipmentDetails from "./pages/admin/ShipmentDetails";
import TrackParcel from "./pages/admin/TrackParcel";
import Profile from "./pages/admin/Profile";
import Notifications from "./pages/admin/Notifications";
import Settings from "./pages/admin/Settings";
import HelpSupport from "./pages/admin/HelpSupport";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="shipments" element={<ManageShipments />} />
          <Route path="shipments/:id" element={<ShipmentDetails />} />
          <Route path="track" element={<TrackParcel />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<HelpSupport />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}