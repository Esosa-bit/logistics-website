import { Link } from 'react-router-dom'
import { COMPANY_CONTACT, COMPANY_NAME } from '../../lib/constants'
import { NAV_LINKS } from '../../lib/routes'
import { PageContainer } from './PageContainer'

export function Footer() {
  return (
    <footer className="mt-16 bg-navy-900 text-navy-100">
      <PageContainer className="grid gap-8 py-10 sm:grid-cols-2">
        <div>
          <p className="font-heading text-lg font-semibold text-white">{COMPANY_NAME}</p>
          <p className="mt-2 max-w-sm text-sm">Book deliveries, track shipments and manage your account in one place.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <nav aria-label="Footer">
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <address className="space-y-2 text-sm not-italic">
            <p>{COMPANY_CONTACT.phone}</p>
            <p>{COMPANY_CONTACT.email}</p>
            <p>{COMPANY_CONTACT.address}</p>
          </address>
        </div>
      </PageContainer>
      <div className="border-t border-white/15 py-4 text-center text-xs">
        © {new Date().getFullYear()} {COMPANY_NAME}. Student project.
      </div>
    </footer>
  )
}