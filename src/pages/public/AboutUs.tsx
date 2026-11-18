
import {
  Target,
  Eye,
  ShieldCheck,
  Users,
  Clock,
  Award,
  Truck,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

// TypeScript definition for company values
type Value = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function About() {
  const values: Value[] = [
    {
      title: "Reliability",
      description:
        "We are committed to dependable transportation and timely deliveries.",
      icon: ShieldCheck,
    },
    {
      title: "Customer Satisfaction",
      description:
        "We put our customers first through responsive and dependable service.",
      icon: Users,
    },
    {
      title: "Efficiency",
      description:
        "We coordinate deliveries carefully to make transportation easier.",
      icon: Clock,
    },
    {
      title: "Professionalism",
      description:
        "We maintain high standards in our operations and customer service.",
      icon: Award,
    },
  ];

  return (
    <main className="bg-white">
      {/* Page Introduction */}
      <section className="bg-blue-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-orange-400">
            About Our Company
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold md:text-6xl text-white">
            VISIONARY LOGISTICS
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Moving goods with care. Connecting destinations
            through dependable logistics solutions.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="font-semibold uppercase tracking-widest text-orange-500">
            Who We Are
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-blue-950 md:text-4xl">
            Reliable Logistics. Professional Service.
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Visionary Logistics is focused on providing dependable
            transportation and delivery solutions for individuals
            and businesses. We believe that moving goods should be
            organised, secure and efficient.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Our logistics operations are built around coordinated
            delivery services, professional personnel and a
            dependable transportation fleet.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            From dispatch motorcycle deliveries to company vans
            and larger transport vehicles, we aim to connect
            customers with reliable delivery solutions.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="/images/visionary-logistics.png"
            alt="Visionary Logistics warehouse, delivery vehicles and team"
            className="h-320px w-full object-cover md:h-420px"
          />
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="border-l-4 border-orange-500 bg-white p-8 shadow-sm">
            <Target size={38} className="text-orange-500" />

            <h2 className="mt-5 text-2xl font-bold text-blue-950">
              Our Mission
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              To provide efficient and reliable logistics services
              that simplify the transportation and delivery of goods
              while maintaining a strong commitment to customer satisfaction.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 bg-white p-8 shadow-sm">
            <Eye size={38} className="text-orange-500" />

            <h2 className="mt-5 text-2xl font-bold text-blue-950">
              Our Vision
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              To become a trusted logistics brand recognised for
              professionalism, reliability and excellent delivery
              services across local and international markets.
            </p>
          </div>
        </div>
      </section>

      {/* Our Operations */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="font-semibold uppercase tracking-widest text-orange-500">
            What We Do
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-blue-950 md:text-4xl">
            Our Logistics Operations
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Our operations bring together different transportation
            options to support the movement of goods and packages.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="border border-gray-200 p-7">
            <Truck size={34} className="text-orange-500" />

            <h3 className="mt-5 text-xl font-bold text-blue-950">
              Fleet Transportation
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Company vans and larger vehicles for transporting
              goods between destinations.
            </p>
          </div>

          <div className="border border-gray-200 p-7">
            <Truck size={34} className="text-orange-500" />

            <h3 className="mt-5 text-xl font-bold text-blue-950">
              Dispatch Delivery
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Motorcycle dispatch services for convenient local
              collection and package delivery.
            </p>
          </div>

          <div className="border border-gray-200 p-7">
            <Users size={34} className="text-orange-500" />

            <h3 className="mt-5 text-xl font-bold text-blue-950">
              Professional Team
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Coordinated personnel working together to support
              reliable logistics operations.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-blue-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="font-semibold uppercase tracking-widest text-orange-400">
              What Guides Us
            </p>

            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl text-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="border-t border-slate-600 pt-6"
                >
                  <Icon size={32} className="text-orange-400" />

                  <h3 className="mt-5 text-xl font-bold text-white">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-300">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
