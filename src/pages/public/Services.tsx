
import {
  Truck,
  Package,
  MapPin,
  ClipboardList,
  Bike,
  Globe,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

// Define the structure of each service
type Service = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

// List of logistics services
const services: Service[] = [
  {
    number: "01",
    title: "Goods Transportation",
    description:
      "Reliable transportation of goods using our delivery vans and larger transport vehicles.",
    icon: Truck,
  },
  {
    number: "02",
    title: "Dispatch Delivery",
    description:
      "Convenient motorcycle dispatch services for local package collection and delivery.",
    icon: Bike,
  },
  {
    number: "03",
    title: "Package Delivery",
    description:
      "Secure and dependable delivery of parcels to homes, offices and businesses.",
    icon: Package,
  },
  {
    number: "04",
    title: "International Logistics",
    description:
      "Logistics support for shipments moving across international destinations.",
    icon: Globe,
  },
  {
    number: "05",
    title: "Shipment Tracking",
    description:
      "Shipment monitoring that helps customers follow delivery progress.",
    icon: MapPin,
  },
  {
    number: "06",
    title: "Logistics Management",
    description:
      "Organised coordination of transportation, shipments and delivery operations.",
    icon: ClipboardList,
  },
];

// Services page component
export default function Services() {
  return (
    <main className="min-h-screen bg-white">

      {/* Services Introduction */}
      <section className="bg-blue-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-orange-400">
            What We Do
          </p>

          <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
            Our Logistics Services
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            At Visionary Logistics, we provide transportation,
            dispatch and package delivery solutions designed to
            make the movement of goods more organised and reliable.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">
            <p className="font-semibold uppercase tracking-widest text-orange-500">
              Our Expertise
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-blue-950 md:text-4xl">
              Services We Provide
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              Explore our range of logistics services for individuals,
              businesses and organisations.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.number}
                  className="border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={36} className="text-orange-500" />

                    <span className="text-3xl font-bold text-orange-500">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-blue-950">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-slate-100 px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-extrabold text-blue-950">
            Moving Your Goods. Connecting Your World.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
            Visionary Logistics is committed to dependable
            transportation and delivery solutions.
          </p>
        </div>
      </section>

    </main>
  );
}
