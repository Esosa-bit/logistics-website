import { NavLink } from 'react-router-dom'

export type SidebarLink = { to: string; label: string }

type SidebarProps = {
  links: SidebarLink[]
  onNavigate?: () => void // lets the mobile menu close after a click
}

export default function Sidebar({ links, onNavigate }: SidebarProps) {
  return (
    <nav aria-label="Sidebar" className="flex flex-col gap-1 p-4">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end // "/customer/dashboard" is active only on that exact path
          onClick={onNavigate}
          // NavLink tells us isActive, so we can highlight the current page
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 text-sm font-medium ${
              isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}