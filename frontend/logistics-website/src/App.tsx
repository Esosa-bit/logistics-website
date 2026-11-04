import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import CustomerLayout from './layouts/CustomerLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/public/Home'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import ForgotPassword from './pages/public/ForgotPassword'
import ResetPassword from './pages/public/ResetPassword'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import BookDelivery from './pages/customer/BookDelivery'
import MyShipments from './pages/customer/MyShipments'
import MyProfile from './pages/customer/MyProfile'
import AdminDashboard from './pages/admin/AdminDashboard'
import RiderDashboard from './pages/rider/RiderDashboard'

function App() {
  return (
    <Routes>
      {/* Public pages: Navbar + Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Customer pages: guard first, then the sidebar layout */}
      <Route element={<ProtectedRoute allow={['customer']} />}>
        <Route element={<CustomerLayout />}>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/book" element={<BookDelivery />} />
          <Route path="/customer/shipments" element={<MyShipments />} />
          <Route path="/customer/profile" element={<MyProfile />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route element={<ProtectedRoute allow={['rider']} />}>
        <Route path="/rider/dashboard" element={<RiderDashboard />} />
      </Route>
    </Routes>
  )
}

export default App