import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { ROUTES } from './lib/routes'
import ContactUs from './pages/ContactUs'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import TeammatePlaceholder from './pages/TeammatePlaceholder'
import TrackShipment from './pages/TrackShipment'

export default function App() {
  return (
    <Routes>
      {/* RootLayout wraps every page with the navbar and footer */}
      <Route element={<RootLayout />}>
        {/* My pages */}
        <Route path={ROUTES.track} element={<TrackShipment />} />
        <Route path={ROUTES.contact} element={<ContactUs />} />
        <Route path={ROUTES.register} element={<Register />} />

        {/* Teammates' pages: swap each element when their page is ready */}
        <Route path={ROUTES.home} element={<TeammatePlaceholder pageName="Home" />} />
        <Route path={ROUTES.about} element={<TeammatePlaceholder pageName="About us" />} />
        <Route path={ROUTES.services} element={<TeammatePlaceholder pageName="Services" />} />
        <Route path={ROUTES.login} element={<TeammatePlaceholder pageName="Log in" />} />
        <Route path={ROUTES.forgotPassword} element={<TeammatePlaceholder pageName="Forgot password" />} />
        <Route path={ROUTES.resetPassword} element={<TeammatePlaceholder pageName="Reset password" />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}