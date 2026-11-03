import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/public/Home'
import Login from './pages/public/Login'
import ForgotPassword from './pages/public/ForgotPassword'
import ResetPassword from './pages/public/ResetPassword'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import RiderDashboard from './pages/rider/RiderDashboard'
import Register from './pages/public/Register'

function App() {
  return (
    <Routes>
      {/* Everything inside renders in PublicLayout's <Outlet /> */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        // ...
<Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute allow={['customer']} />}>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allow={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allow={['rider']} />}>
          <Route path="/rider/dashboard" element={<RiderDashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App