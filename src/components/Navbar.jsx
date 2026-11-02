
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-950 px-6 py-5 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex flex-col">
          <span className="text-xl font-extrabold md:text-2xl">
            VISIONARY LOGISTICS
            <span className="text-orange-500">.</span>
          </span>
          <span className="text-xs font-semibold tracking-widest text-orange-400">
            DELIVERING ACROSS THE GLOBE
          </span>
        </Link>

        <div className="flex flex-wrap gap-4 text-sm font-medium md:gap-6 md:text-base">
          <Link to="/" className="transition hover:text-orange-400">
            Home
          </Link>
          <Link to="/about" className="transition hover:text-orange-400">
            About Us
          </Link>
          <Link to="/services" className="transition hover:text-orange-400">
            Services
          </Link>
        </div>
      </div>
    </nav>
  );
}
