import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function RootLayout() {
  const { pathname } = useLocation()

  // Start each new page at the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Lets keyboard users skip the navbar */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" className="flex-1 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}