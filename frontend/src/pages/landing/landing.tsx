function Landing() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">
        <h1 className="text-2xl font-bold">
          Aqua<span className="text-blue-400">Alart</span>
        </h1>

        <button className="rounded-lg bg-blue-500 px-5 py-2 font-medium hover:bg-blue-600">
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
          Smart Urban Flood Monitoring
        </div>

        <h2 className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
          Smart Waterlogging Detection &
          <br />
          <span className="text-blue-400">Road Safety System.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Real-time rainfall and waterlogging monitoring system designed
          to help cities detect, predict and respond to urban flooding.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-lg bg-blue-500 px-6 py-3 font-semibold hover:bg-blue-600">
            Explore Dashboard
          </button>

          <button className="rounded-lg border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-900">
            Report Flood
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-5 px-8 pb-16 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold">🌧️ Rainfall Monitoring</h3>
          <p className="mt-2 text-slate-400">
            Monitor rainfall conditions across different areas in real time.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold">🌊 Flood Prediction</h3>
          <p className="mt-2 text-slate-400">
            Identify areas that may experience waterlogging and flooding.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold">📍 Citizen Reports</h3>
          <p className="mt-2 text-slate-400">
            Citizens can report flooded locations and help authorities respond faster.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Landing