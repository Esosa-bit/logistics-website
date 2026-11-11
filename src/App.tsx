
import { Route, Routes } from 'react-router-dom'

import PublicLayout from './layouts/PublicLayout'
import CustomerLayout from './layouts/CustomerLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/public/Home'
import AboutUs from './pages/public/AboutUs'
import Services from './pages/public/Services'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import ForgotPassword from './pages/public/ForgotPassword'
import ResetPassword from './pages/public/ResetPassword'

import CustomerDashboard from './pages/customer/CustomerDashboard'
import BookDelivery from './pages/customer/BookDelivery'
import MyShipments from './pages/customer/MyShipments'
import ShipmentDetails from './pages/customer/ShipmentDetails'
import MyPayments from './pages/customer/MyPayments'
import MyProfile from './pages/customer/MyProfile'

import AdminDashboard from './pages/admin/AdminDashboard'
import RiderDashboard from './pages/rider/RiderDashboard'

import ContactUs from './pages/ContactUs'
import NotFound from './pages/NotFound'
import TeammatePlaceholder from './pages/TeammatePlaceholder'
import TrackShipment from './pages/TrackShipment'

import { RootLayout } from './components/layout/RootLayout'
import { ROUTES } from './lib/routes'

export default function App() {
  return (
    <Routes>
      {/* Main website pages */}
      <Route element={<RootLayout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.track} element={<TrackShipment />} />
        <Route path={ROUTES.contact} element={<ContactUs />} />
        <Route path={ROUTES.about} element={<AboutUs />} />
        <Route path={ROUTES.services} element={<Services />} />
      </Route>

      {/* Public authentication pages */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Customer pages */}
      <Route element={<ProtectedRoute allow={['customer']} />}>
        <Route element={<CustomerLayout />}>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/book" element={<BookDelivery />} />
          <Route path="/book-delivery" element={<BookDelivery />} />
          <Route path="/customer/shipments" element={<MyShipments />} />
          <Route path="/customer/shipments/:id" element={<ShipmentDetails />} />
          <Route path="/customer/payments" element={<MyPayments />} />
          <Route path="/customer/profile" element={<MyProfile />} />
        </Route>
      </Route>

      {/* Admin dashboard */}
      <Route element={<ProtectedRoute allow={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Rider dashboard */}
      <Route element={<ProtectedRoute allow={['rider']} />}>
        <Route path="/rider/dashboard" element={<RiderDashboard />} />
      </Route>

      {/* Fallback for pages not yet implemented */}
      <Route path="/team-login" element={<TeammatePlaceholder pageName="Log in" />} />

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
