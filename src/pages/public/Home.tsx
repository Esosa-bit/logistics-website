
import {
  Truck,
  Package,
  MapPin,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Goods Transportation",
    description:
      "Reliable transportation of goods from one location to another, safely and efficiently.",
  },
  {
    icon: Package,
    title: "Package Delivery",
    description:
      "Fast and secure delivery services designed to get your packages to their destination.",
  },
  {
    icon: MapPin,
    title: "Shipment Tracking",
    description:
      "Stay informed about your shipments and monitor their delivery progress.",
  },
  {
    icon: ClipboardList,
    title: "Logistics Management",
    description:
      "Efficient management of deliveries, shipments, and logistics operations.",
  },
];

function Home() {
  return (
    <main className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[550px] items-center justify-center bg-blue-950">

        <img
          src="/images/visionary-logistics.png"
          alt="Visionary Logistics delivery operations"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-blue-950/60"></div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center text-white">
          <p className="mb-4 font-semibold uppercase tracking-[0.3em] text-orange-400">
            Delivering Across the Globe
          </p>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
            VISIONARY LOGISTICS
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-100 md:text-xl">
            Your trusted partner for reliable transportation, secure package
            delivery, and efficient logistics management.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/book-delivery"
              className="rounded-md bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Book a Delivery
            </a>

            <a
              href="/track"
              className="rounded-md border-2 border-white px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-950"
            >
              Track Shipment
            </a>
          </div>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-orange-500">
            Welcome to Visionary Logistics
          </p>

          <h2 className="mb-6 text-3xl font-bold text-blue-950 md:text-4xl">
            Moving Your World Forward
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
            At Visionary Logistics, we are committed to making transportation
            and delivery easier, faster, and more reliable. We provide
            dependable logistics solutions that connect people, businesses,
            and destinations.
          </p>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-gray-100 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 font-semibold uppercase tracking-widest text-orange-500">
              What We Offer
            </p>

            <h2 className="text-3xl font-bold text-blue-950 md:text-4xl">
              Our Services
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              We provide dependable logistics services to meet your delivery
              and transportation needs.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={index}
                  className="rounded-xl bg-white p-7 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                    <Icon size={30} />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-blue-950">
                    {service.title}
                  </h3>

                  <p className="leading-7 text-gray-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/services"
              className="inline-flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700"
            >
              Explore Our Services <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 font-semibold uppercase tracking-widest text-orange-500">
              About Us
            </p>

            <h2 className="mb-6 text-3xl font-bold text-blue-950 md:text-4xl">
              Your Reliable Logistics Partner
            </h2>

            <p className="mb-5 leading-8 text-gray-600">
              Visionary Logistics is dedicated to providing efficient,
              dependable, and customer-focused logistics solutions.
            </p>

            <p className="mb-7 leading-8 text-gray-600">
              Our goal is to simplify the delivery process by helping customers
              book deliveries, track shipments, and stay informed about their
              goods.
            </p>

            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-md bg-blue-950 px-6 py-3 font-semibold text-white transition hover:bg-blue-900"
            >
              Learn More <ArrowRight size={18} />
            </a>
          </div>

          <div className="rounded-xl bg-blue-950 p-10 text-white">
            <h3 className="mb-5 text-2xl font-bold">
              Delivering With Excellence
            </h3>

            <p className="leading-8 text-gray-200">
              From the moment a shipment is booked until it reaches its
              destination, we focus on reliability, transparency, and customer
              satisfaction.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
