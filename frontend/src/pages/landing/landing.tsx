import { useState } from "react";
import {
  Droplet,
  CloudRain,
  MapPin,
  Bell,
  ShieldAlert,
  Route,
  ClipboardList,
  CheckCircle2,
  Building2,
  Users,
  Phone,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: CloudRain,
    title: "Real-Time Rainfall Monitoring",
    desc: "Live rainfall data coupled with drainage capacity to predict water-logging before it happens.",
  },
  {
    icon: MapPin,
    title: "City-Wide Flood Risk Map",
    desc: "Area-wise heatmap showing high-risk, water-logged, and normal zones updated in real time.",
  },
  {
    icon: ClipboardList,
    title: "Instant Complaint Reporting",
    desc: "Citizens report potholes and drainage issues in seconds, with photo proof and live status tracking.",
  },
  {
    icon: Bell,
    title: "Smart Alerts & Broadcast",
    desc: "Automatic high-rainfall alerts to residents of at-risk areas, and broadcast notices from Nagar Nigam.",
  },
  {
    icon: ShieldAlert,
    title: "5-Day Flood Prediction",
    desc: "Forecast-driven risk scoring so both citizens and admins can prepare days in advance.",
  },
  {
    icon: Route,
    title: "Safe Route Navigation",
    desc: "Avoid blocked roads and flooded stretches — includes safe-route guidance to the nearest hospital.",
  },
];

const steps = [
  {
    icon: MapPin,
    title: "Report",
    desc: "Spot water-logging or a drainage issue? Report it with your location in a couple of taps.",
  },
  {
    icon: ClipboardList,
    title: "Track",
    desc: "Follow your complaint from Pending to Resolved, with updates at every stage.",
  },
  {
    icon: Bell,
    title: "Stay Informed",
    desc: "Get alerted before the next heavy rain hits your area — plan ahead, stay safe.",
  },
];

const stats = [
  { label: "Complaints Handled", value: "1,250+" },
  { label: "Resolved This Month", value: "930" },
  { label: "High-Risk Areas Tracked", value: "12" },
  { label: "Avg. Response Time", value: "< 3 hrs" },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ---------------- Navbar ---------------- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center">
              <Droplet className="text-white" size={18} fill="white" />
            </div>
            <div>
              <p className="font-extrabold text-lg leading-none">
                Aqua<span className="text-blue-600">Alert</span>
              </p>
              <p className="text-[11px] text-slate-400 leading-none mt-1">
                Safer Cities, Brighter Tomorrows
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600">How It Works</a>
            <a href="#dashboard" className="hover:text-blue-600">Dashboard</a>
            <a href="#for-cities" className="hover:text-blue-600">For Nagar Nigam</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 px-4 py-2"
            >
              Login
            </a>
            <a
              href="/signup"
              className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>

          <button
            className="md:hidden text-slate-700"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-slate-600">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a>
            <a href="#for-cities" onClick={() => setMenuOpen(false)}>For Nagar Nigam</a>
            <div className="flex gap-3 pt-2">
              <a href="/login" className="flex-1 text-center py-2 rounded-lg border border-slate-200">
                Login
              </a>
              <a href="/signup" className="flex-1 text-center py-2 rounded-lg bg-blue-600 text-white">
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full mb-4">
              Built for Smart India Hackathon — SIH26085
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">
              Real-Time Urban Flood
              <br />
              <span className="text-blue-600">Nowcasting for Safer Cities</span>
            </h1>
            <p className="mt-5 text-lg text-slate-500 max-w-lg">
              AquaAlert couples live rainfall data with drainage capacity to warn
              citizens and municipal teams before water-logging turns into a
              crisis — early alerts, faster response, safer streets.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                Report an Issue <ArrowRight size={18} />
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                View Live Map
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration card */}
          <div className="relative">
            <div className="rounded-2xl bg-white shadow-xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold text-slate-800">City / Area Map</p>
                <span className="text-xs text-slate-400">All Areas</span>
              </div>
              <div className="rounded-xl bg-gradient-to-b from-sky-100 to-blue-100 h-56 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-blue-300/60" />
                <MapPin className="absolute text-red-500 top-8 left-10" size={26} fill="currentColor" />
                <MapPin className="absolute text-amber-500 top-16 right-14" size={26} fill="currentColor" />
                <MapPin className="absolute text-emerald-500 bottom-20 left-24" size={26} fill="currentColor" />
                <MapPin className="absolute text-red-500 bottom-24 right-24" size={26} fill="currentColor" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="rounded-lg bg-red-50 p-3">
                  <p className="text-xs text-red-600 font-medium">High Risk</p>
                  <p className="text-lg font-bold text-red-700">12</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3">
                  <p className="text-xs text-amber-600 font-medium">Water Logged</p>
                  <p className="text-lg font-bold text-amber-700">8</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <p className="text-xs text-emerald-600 font-medium">Normal</p>
                  <p className="text-lg font-bold text-emerald-700">42</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Everything a flood-ready city needs
          </h2>
          <p className="mt-3 text-slate-500">
            From live rainfall tracking to citizen complaints — one platform
            connecting people and municipal response.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <f.icon className="text-blue-600" size={22} />
              </div>
              <h3 className="font-semibold text-slate-900">{f.title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section id="how-it-works" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>
            <p className="mt-3 text-slate-500">
              Three simple steps for every citizen — report, track, stay safe.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="relative text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                  <s.icon size={26} />
                </div>
                <p className="mt-5 font-bold text-slate-900">
                  {i + 1}. {s.title}
                </p>
                <p className="mt-2 text-sm text-slate-500 max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Dashboard preview ---------------- */}
      <section id="dashboard" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full mb-4">
              For Nagar Nigam Admins
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              One dashboard for the whole city
            </h2>
            <p className="mt-4 text-slate-500">
              Track complaints, monitor rainfall, spot high-risk zones on a live
              map, and dispatch teams — all from a single admin console built
              for municipal teams.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "City-wide map with rainfall & risk heatmap",
                "Complaint management with false-complaint detection",
                "Broadcast alerts to high-risk area residents",
                "Inspection history for every flagged area",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-100 shadow-xl bg-white p-5">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Total Complaints</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">1,250</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Resolved</p>
                <p className="text-xl font-extrabold text-emerald-600 mt-1">930</p>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500 mb-3">Complaints Status</p>
              <div className="space-y-2">
                {[
                  { label: "Resolved", value: 74, color: "bg-emerald-500" },
                  { label: "In Progress", value: 20, color: "bg-amber-500" },
                  { label: "Pending", value: 26, color: "bg-red-500" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{row.label}</span>
                      <span>{row.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className={`h-full ${row.color}`} style={{ width: `${row.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Who it's for ---------------- */}
      <section id="for-cities" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-100">
            <Users className="text-blue-600 mb-4" size={28} />
            <h3 className="text-xl font-bold text-slate-900">For Citizens</h3>
            <p className="text-sm text-slate-500 mt-2">
              Report issues, track complaint status, view flood-risk areas near
              you, and get safe-route guidance — login with phone or email.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-100">
            <Building2 className="text-blue-600 mb-4" size={28} />
            <h3 className="text-xl font-bold text-slate-900">For Nagar Nigam</h3>
            <p className="text-sm text-slate-500 mt-2">
              Manage city-wide complaints, monitor rainfall and risk zones, and
              dispatch inspection teams to flagged high-risk areas.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Ready to build a safer, flood-ready city?
        </h2>
        <p className="mt-3 text-slate-500 max-w-xl mx-auto">
          Join AquaAlert today — for citizens who want to stay informed, and
          municipal teams who want to respond faster.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            Get Started <ArrowRight size={18} />
          </a>
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            Login
          </a>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center">
              <Droplet className="text-white" size={16} fill="white" />
            </div>
            <p className="font-bold text-slate-900">
              Aqua<span className="text-blue-600">Alert</span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-red-600 font-medium">
            <Phone size={16} />
            Emergency Helpline: 1077 (24×7)
          </div>

          <p className="text-xs text-slate-400">
            &copy; 2024 AquaAlert. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}