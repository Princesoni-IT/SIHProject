import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Droplet,
  CloudRain,
  AlertTriangle,
  MapPin,
  Mic,
  PlusCircle,
  Clock,
  CheckCircle2,
  PhoneCall,
  LogOut,
  User as UserIcon,
  Search,
  Filter,
  ShieldCheck,
  Send,
} from "lucide-react";

interface Complaint {
  id: string;
  category: string;
  location: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved";
  date: string;
  priority: "Low" | "Medium" | "High";
}

const initialComplaints: Complaint[] = [
  {
    id: "CMP-9042",
    category: "Drainage Blockage",
    location: "Civil Lines, Near Sector 4 Park",
    description: "Main drain overflowed following 45min heavy downpour. Road submerged under 1ft water.",
    status: "In Progress",
    date: "2026-09-05 14:15",
    priority: "High",
  },
  {
    id: "CMP-8831",
    category: "Pothole / Road Hazard",
    location: "Station Road, Flyover Junction",
    description: "Deep pothole filled with rainwater causing vehicle slowdown and hazard.",
    status: "Resolved",
    date: "2026-09-03 09:30",
    priority: "Medium",
  },
];

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string; email: string; phone?: string; role?: string } | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [showModal, setShowModal] = useState(false);

  // New complaint form state
  const [category, setCategory] = useState("Drainage Blockage");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");
    if (!storedUser || !token) {
      navigate("/login");
      return;
    }
    try {
      setUser(JSON.parse(storedUser));
    } catch (e) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !description) return;

    const newCmp: Complaint = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      location,
      description,
      status: "Pending",
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      priority,
    };

    setComplaints([newCmp, ...complaints]);
    setLocation("");
    setDescription("");
    setShowModal(false);
  };

  const filteredComplaints = complaints.filter((cmp) => {
    if (filterStatus === "All") return true;
    return cmp.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* ---------------- Header ---------------- */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Droplet className="text-white" size={22} fill="white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">Aqua<span className="text-blue-600">Alert</span></span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">Citizen Portal</span>
              </div>
              <p className="text-xs text-slate-500">Waterlogging & Flood Monitoring Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-slate-700 font-medium">
              <UserIcon size={16} className="text-slate-500" />
              <span>{user?.email || "Citizen User"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors border border-red-200"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Main Content ---------------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Live Risk Alert Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 text-white shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                <AlertTriangle size={28} className="text-white animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">Moderate Flood Risk</span>
                  <span className="text-xs opacity-80">Updated 10m ago</span>
                </div>
                <h2 className="text-xl font-bold mt-1">High Rainfall Alert in South & Central Zones</h2>
                <p className="text-sm opacity-90 mt-1 max-w-2xl">
                  Heavy rain expected for the next 2 hours. Avoid underpasses at Station Road and Civil Lines Flyover.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/voice-complain")}
              className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-orange-600 font-bold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Mic size={18} className="animate-pulse" />
              Voice Complaint Agent
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">My Complaints</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{complaints.length}</h3>
              <p className="text-xs text-blue-600 font-medium mt-1">1 active in progress</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Droplet size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rainfall Rate</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">32 mm/h</h3>
              <p className="text-xs text-amber-600 font-medium mt-1">Moderate Intensity</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
              <CloudRain size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Drainage Capacity</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">78%</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Normal flow</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Helpline</p>
              <h3 className="text-xl font-bold text-slate-900 mt-1">1800-112-990</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Nagar Nigam Emergency</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <PhoneCall size={24} />
            </div>
          </div>
        </div>

        {/* Complaints Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Report & Track Issues</h2>
              <p className="text-xs text-slate-500 mt-0.5">Submit waterlogging, drainage blocks, or road hazards</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                {["All", "Pending", "In Progress", "Resolved"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      filterStatus === st
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
              >
                <PlusCircle size={16} />
                New Complaint
              </button>
            </div>
          </div>

          {/* Complaints Table / Cards */}
          <div className="divide-y divide-slate-100">
            {filteredComplaints.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <CheckCircle2 size={40} className="mx-auto text-slate-300 mb-2" />
                <p className="font-semibold text-slate-600">No complaints found</p>
                <p className="text-xs text-slate-400 mt-1">Submit a new complaint using the button above.</p>
              </div>
            ) : (
              filteredComplaints.map((cmp) => (
                <div key={cmp.id} className="p-6 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-400">{cmp.id}</span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                        {cmp.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                          cmp.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : cmp.priority === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {cmp.priority} Priority
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                      <MapPin size={16} className="text-blue-500 shrink-0" />
                      <span>{cmp.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 max-w-3xl">{cmp.description}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                      <Clock size={12} />
                      <span>Reported on {cmp.date}</span>
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                        cmp.status === "Resolved"
                          ? "bg-emerald-100 text-emerald-700"
                          : cmp.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {cmp.status === "Resolved" && <CheckCircle2 size={14} />}
                      {cmp.status === "In Progress" && <Clock size={14} className="animate-spin" />}
                      {cmp.status === "Pending" && <AlertTriangle size={14} />}
                      {cmp.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* ---------------- New Complaint Modal ---------------- */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="text-blue-600" size={20} />
                Report an Issue
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateComplaint} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 bg-white"
                >
                  <option value="Drainage Blockage">Drainage Blockage</option>
                  <option value="Waterlogging / Flooding">Waterlogging / Flooding</option>
                  <option value="Pothole / Road Hazard">Pothole / Road Hazard</option>
                  <option value="Sewer Overflow">Sewer Overflow</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location / Area Name
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Station Road Near Bus Stand"
                  className="w-full h-11 px-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Priority Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Low", "Medium", "High"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`h-10 rounded-xl text-xs font-bold border transition-colors ${
                        priority === p
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-500/20"
                >
                  <Send size={16} />
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
