
import { Route, Routes } from 'react-router-dom'

import CustomerLayout from './layouts/CustomerLayout'
import ProtectedRoute from './components/ProtectedRoute'
import PublicLayout from './layouts/PublicLayout'

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

      
  {/* Authentication pages now use the same layout */}
  <Route path={ROUTES.login} element={<Login />} />
  <Route path={ROUTES.register} element={<Register />} />
  <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
  <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
</Route>

      {/* Customer pages */}
      <Route element={<ProtectedRoute allow={['customer']} />}>
        <Route element={<CustomerLayout />}>
          <Route path={ROUTES.customerDashboard} element={<CustomerDashboard />} />
          <Route path={ROUTES.bookDelivery} element={<BookDelivery />} />
          <Route path={ROUTES.myShipments} element={<MyShipments />} />
          <Route path={ROUTES.shipmentDetails} element={<ShipmentDetails />} />
          <Route path={ROUTES.myPayments} element={<MyPayments />} />
          <Route path={ROUTES.myProfile} element={<MyProfile />} />
        </Route>
      </Route>

      {/* Admin dashboard */}
      <Route element={<ProtectedRoute allow={['admin']} />}>
        <Route path={ROUTES.adminDashboard} element={<AdminDashboard />} />
      </Route>

      {/* Rider dashboard */}
      <Route element={<ProtectedRoute allow={['rider']} />}>
        <Route path={ROUTES.riderDashboard} element={<RiderDashboard />} />
      </Route>

      {/* Fallback for pages not yet implemented */}
      <Route path={ROUTES.teamLogin} element={<TeammatePlaceholder pageName="Log in" />} />

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
