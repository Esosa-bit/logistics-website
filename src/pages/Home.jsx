
import {
  Truck,
  Package,
  MapPin,
  ClipboardList,
} from "lucide-react";

function Home() {
  const services = [
    {
      title: "Goods Transportation",
      description:
        "Safe and reliable transportation of goods from one location to another.",
      icon: Truck,
    },
    {
      title: "Package Delivery",
      description:
        "Fast and secure delivery of packages to homes and businesses.",
      icon: Package,
    },
    {
      title: "Shipment Tracking",
      description:
        "Keep track of your shipments and monitor delivery progress.",
      icon: MapPin,
    },
    {
      title: "Logistics Management",
      description:
        "Efficient management of deliveries and logistics operations.",
      icon: ClipboardList,
    },
  ];

  return (
    <main className="w-full overflow-x-hidden bg-white">

      {/* Hero Image */}
      <div className="h-[450px] w-full overflow-hidden md:h-[550px]">
        <img
          src="/images/Visionary Logistics.png"
          alt="Visionary Logistics delivery fleet"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Welcome Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="mb-4 font-semibold uppercase tracking-[0.25em] text-orange-500">
          Delivering Across the Globe
        </p>

        <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
          VISIONARY LOGISTICS
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Your trusted partner for local and international deliveries.
          We provide reliable transportation, secure package delivery
          and smarter logistics solutions.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="rounded-lg bg-orange-500 px-7 py-3 font-bold text-white transition hover:bg-orange-600">
            Book a Delivery
          </button>

          <button className="rounded-lg border-2 border-slate-900 px-7 py-3 font-bold text-slate-900 transition hover:bg-slate-900 hover:text-white">
            Track Shipment
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">
            <p className="font-semibold uppercase tracking-widest text-orange-500">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Our Services
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Dependable logistics solutions designed to make
              transportation and delivery easier.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={index}
                  className="rounded-xl bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                    <Icon size={30} />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="leading-7 text-slate-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          <div>
            <p className="font-semibold uppercase tracking-widest text-orange-500">
              About Visionary Logistics
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              Moving Your World Forward
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Visionary Logistics is focused on making goods
              transportation and package delivery easier and more
              efficient. We bring together dependable delivery
              services and smarter logistics coordination.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              From local dispatch riders to road and international
              air transportation, our vision is to connect people
              and businesses through reliable delivery solutions.
            </p>

            <button className="mt-8 rounded-lg bg-orange-500 px-7 py-3 font-bold text-white transition hover:bg-orange-600">
              Learn More
            </button>
          </div>

          <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-slate-900 p-10 text-center">
            <div>
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500">
                <Truck size={40} className="text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white">
                Delivering Across the Globe
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                Safe transportation. Faster delivery. A connected world.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Home;
