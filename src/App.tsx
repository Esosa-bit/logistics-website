import { Route, Routes } from 'react-router-dom';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import RiderLayout from './components/layout/RiderLayout';
import { RootLayout } from './components/layout/RootLayout';

// Authentication and protection
import ProtectedRoute from './components/ProtectedRoute';

// Route configurations
import { ROUTES } from './lib/routes';
import { RIDER_ROUTES } from './lib/riderRoutes';

// Public pages
import Home from './pages/public/Home';
import AboutUs from './pages/public/AboutUs';
import Services from './pages/public/Services';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import ResetPassword from './pages/public/ResetPassword';

// Customer pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import BookDelivery from './pages/customer/BookDelivery';
import MyShipments from './pages/customer/MyShipments';
import ShipmentDetails from './pages/customer/ShipmentDetails';
import MyPayments from './pages/customer/MyPayments';
import MyProfile from './pages/customer/MyProfile';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Rider pages
import RiderDashboard from './pages/rider/RiderDashboard';
import AssignedDeliveries from './pages/rider/AssignedDeliveries';
import DeliveryDetails from './pages/rider/DeliveryDetails';
import UpdateDeliveryStatus from './pages/rider/UpdateDeliveryStatus';
import ProofOfDelivery from './pages/rider/ProofOfDelivery';
import DeliveryHistory from './pages/rider/DeliveryHistory';
import RiderNotifications from './pages/rider/RiderNotifications';
import RiderProfile from './pages/rider/RiderProfile';
import RiderHelpSupport from './pages/rider/RiderHelpSupport';

// Other pages
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import TrackShipment from './pages/TrackShipment';

export default function App() {
return (
<Routes>

  {/* ================================= */}
  {/* PUBLIC WEBSITE AND AUTHENTICATION */}
  {/* ================================= */}

  <Route element={<RootLayout />}>
    <Route path={ROUTES.home} element={<Home />} />
    <Route path={ROUTES.track} element={<TrackShipment />} />
    <Route path={ROUTES.contact} element={<ContactUs />} />
    <Route path={ROUTES.about} element={<AboutUs />} />
    <Route path={ROUTES.services} element={<Services />} />
    <Route path={ROUTES.login} element={<Login />} />
    <Route path={ROUTES.register} element={<Register />} />

    <Route
      path={ROUTES.forgotPassword}
      element={<ForgotPassword />}
    />

    <Route
      path={ROUTES.resetPassword}
      element={<ResetPassword />}
    />
  </Route>


  {/* ================================= */}
  {/* CUSTOMER DASHBOARD AND PAGES */}
  {/* ================================= */}

  <Route element={<ProtectedRoute allow={['customer']} />}>
    <Route element={<CustomerLayout />}>

      <Route
        path={ROUTES.customerDashboard}
        element={<CustomerDashboard />}
      />

      <Route
        path={ROUTES.bookDelivery}
        element={<BookDelivery />}
      />

      <Route
        path={ROUTES.myShipments}
        element={<MyShipments />}
      />

      <Route
        path="/customer/shipments/:shipmentId"
        element={<ShipmentDetails />}
      />

      <Route
        path={ROUTES.myPayments}
        element={<MyPayments />}
      />

      <Route
        path={ROUTES.myProfile}
        element={<MyProfile />}
      />

    </Route>
  </Route>


  {/* ================================= */}
  {/* ADMIN DASHBOARD */}
  {/* ================================= */}

  <Route element={<ProtectedRoute allow={['admin']} />}>
    <Route
      path={ROUTES.adminDashboard}
      element={<AdminDashboard />}
    />
  </Route>


  {/* ================================= */}
  {/* RIDER DASHBOARD AND PAGES */}
  {/* ================================= */}
  <Route element={<ProtectedRoute allow={['rider']} />}>
    <Route element={<RiderLayout />}>

      {/* Rider Dashboard */}
      <Route
        path={RIDER_ROUTES.dashboard}
        element={<RiderDashboard />}
      />

      {/* Assigned Deliveries */}
      <Route
        path={RIDER_ROUTES.deliveries}
        element={<AssignedDeliveries />}
      />

      {/* Delivery Details */}
      <Route
        path={`${RIDER_ROUTES.details}/:id?`}
        element={<DeliveryDetails />}
      />

      {/* Update Delivery Status */}
      <Route
        path={`${RIDER_ROUTES.status}/:id?`}
        element={<UpdateDeliveryStatus />}
      />

      {/* Proof of Delivery */}
      <Route
        path={`${RIDER_ROUTES.proof}/:id?`}
        element={<ProofOfDelivery />}
      />

      {/* Delivery History */}
      <Route
        path={RIDER_ROUTES.history}
        element={<DeliveryHistory />}
      />

      {/* Notifications */}
      <Route
        path={RIDER_ROUTES.notifications}
        element={<RiderNotifications />}
      />

      {/* Rider Profile */}
      <Route
        path={RIDER_ROUTES.profile}
        element={<RiderProfile />}
      />

      {/* Help and Support */}
      <Route
        path={RIDER_ROUTES.help}
        element={<RiderHelpSupport />}
      />

    </Route>
  </Route>

  {/* 404 - NOT FOUND */}
  <Route path="*" element={<NotFound />} />

</Routes>

);
}