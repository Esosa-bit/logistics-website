
import { Link } from "react-router-dom";
import { Truck, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 px-6 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">

        {/* Company Information */}
        <div>
          <h2 className="text-2xl font-extrabold">
            VISIONARY LOGISTICS
          </h2>

          <p className="mt-2 font-semibold tracking-widest text-orange-400">
            DELIVERING ACROSS THE GLOBE
          </p>

          <div className="mt-5 flex items-center gap-3 text-slate-300">
            <Truck size={25} className="text-orange-400" />
            <p className="text-sm leading-6">
              Reliable transportation, secure deliveries and smarter
              logistics solutions.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-orange-400">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-slate-300">
            <Link to="/" className="hover:text-orange-400">
              Home
            </Link>
            <Link to="/about" className="hover:text-orange-400">
              About Us
            </Link>
            <Link to="/services" className="hover:text-orange-400">
              Our Services
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-orange-400">
            Contact Us
          </h3>

          <div className="flex flex-col gap-4 text-sm text-slate-300">
            <p className="flex items-center gap-3">
              <Mail size={18} className="text-orange-400" />
              Your email address
            </p>

            <p className="flex items-center gap-3">
              <Phone size={18} className="text-orange-400" />
              Your phone number
            </p>

            <p className="flex items-center gap-3">
              <MapPin size={18} className="text-orange-400" />
              Your business location
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-slate-700 pt-6 text-center">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Visionary Logistics. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
