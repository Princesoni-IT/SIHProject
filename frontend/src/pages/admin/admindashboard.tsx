import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  Clock,
  Radio,
  Send,
  Users,
  Droplet,
  CloudRain,
  Activity,
  LogOut,
  SlidersHorizontal,
  ChevronRight,
  Filter,
} from "lucide-react";

interface AdminComplaint {
  id: string;
  userEmail: string;
  category: string;
  location: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High";
  date: string;
}

const mockComplaints: AdminComplaint[] = [
  {
    id: "CMP-9042",
    userEmail: "citizen.rahul@example.com",
    category: "Drainage Blockage",
    location: "Civil Lines, Sector 4 Underpass",
    description: "Main drain overflowed following 45min heavy downpour. Road submerged under 1ft water.",
    status: "In Progress",
    priority: "High",
    date: "2026-09-05 14:15",
  },
  {
    id: "CMP-9041",
    userEmail: "priya.verma@example.com",
    category: "Flooded Road",
    location: "MG Road Metro Gate 2",
    description: "Waterlogging preventing pedestrian entry to metro station.",
    status: "Pending",
    priority: "High",
    date: "2026-09-05 13:50",
  },
  {
    id: "CMP-8831",
    userEmail: "amit.sharma@example.com",
    category: "Pothole / Road Hazard",
    location: "Station Road Flyover",
    description: "Deep pothole filled with rainwater causing traffic bottleneck.",
    status: "Resolved",
    priority: "Medium",
    date: "2026-09-03 09:30",
  },
  {
    id: "CMP-8710",
    userEmail: "sunil.kumar@example.com",
    category: "Sewer Overflow",
    location: "Rajendra Nagar Main Market",
    description: "Sewage water leaking onto main road near market plaza.",
    status: "Pending",
    priority: "Medium",
    date: "2026-09-02 18:20",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<AdminComplaint[]>(mockComplaints);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastZone, setBroadcastZone] = useState("All Zones");
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  useEffect(() => {
    // Verify admin access
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");
    if (!storedUser || !token) {
      navigate("/login");
      return;
    }
    try {
      const u = JSON.parse(storedUser);
      if (u.role !== "admin") {
        navigate("/user-dashboard");
      }
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

  const handleStatusChange = (id: string, newStatus: "Pending" | "In Progress" | "Resolved") => {
    setComplaints(
      complaints.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMessage("");
      setShowBroadcastModal(false);
    }, 2000);
  };

  const filteredComplaints = complaints.filter((c) => {
    if (filterStatus === "All") return true;
    return c.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* ---------------- Admin Header ---------------- */}
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Shield className="text-white" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-white tracking-tight">Aqua<span className="text-blue-400">Alert</span></span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">Admin Console</span>
              </div>
              <p className="text-xs text-slate-400">Nagar Nigam Emergency Control Room</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50 border border-slate-600 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Sensor Feeds Active</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/10 border border-red-500/30 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Exit Console</span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Main Console ---------------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Control Bar & Broadcast Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <div>
            <h1 className="text-xl font-extrabold text-white">City Emergency & Flood Management</h1>
            <p className="text-xs text-slate-400 mt-1">Monitor high-risk areas, dispatch cleanup crews, and broadcast safety alerts</p>
          </div>

          <button
            onClick={() => setShowBroadcastModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Radio size={18} className="animate-pulse text-amber-300" />
            Broadcast Emergency Alert
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/80 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Complaints</p>
              <h3 className="text-3xl font-black text-white mt-1">{complaints.filter(c => c.status !== "Resolved").length}</h3>
              <p className="text-xs text-amber-400 font-semibold mt-1">2 high priority</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle size={24} />
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/80 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">High Risk Zones</p>
              <h3 className="text-3xl font-black text-red-400 mt-1">3 Zones</h3>
              <p className="text-xs text-slate-400 mt-1">Zone 4 under observation</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <MapPin size={24} />
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/80 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rescue Teams</p>
              <h3 className="text-3xl font-black text-emerald-400 mt-1">12 Deployed</h3>
              <p className="text-xs text-emerald-400 mt-1">4 on standby</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users size={24} />
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/80 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Resolution Time</p>
              <h3 className="text-3xl font-black text-sky-400 mt-1">2.4 Hrs</h3>
              <p className="text-xs text-slate-400 mt-1">18% faster than last month</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Clock size={24} />
            </div>
          </div>
        </div>

        {/* City Risk Overview Cards */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="text-blue-400" size={20} />
              Zone Risk Monitor & Live Status
            </h2>
            <span className="text-xs text-slate-400">Realtime rainfall & sensor data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-red-500/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">Zone 4 - South</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/40">Critical</span>
              </div>
              <p className="text-xs text-slate-400">Rainfall: 48 mm/h | Water level: 1.2ft</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[90%]" />
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">Zone 2 - Central</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/40">Moderate</span>
              </div>
              <p className="text-xs text-slate-400">Rainfall: 28 mm/h | Water level: 0.4ft</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[60%]" />
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">Zone 1 - North</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">Safe</span>
              </div>
              <p className="text-xs text-slate-400">Rainfall: 10 mm/h | Normal flow</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[20%]" />
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">Zone 3 - East</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">Safe</span>
              </div>
              <p className="text-xs text-slate-400">Rainfall: 14 mm/h | Normal flow</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[25%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Control Table */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Citizen Complaints Queue</h2>
              <p className="text-xs text-slate-400 mt-0.5">Review reported issues and update status</p>
            </div>

            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl text-xs font-semibold border border-slate-700">
              {["All", "Pending", "In Progress", "Resolved"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filterStatus === st
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-700/60">
            {filteredComplaints.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <CheckCircle2 size={40} className="mx-auto text-slate-600 mb-2" />
                <p className="font-semibold text-slate-300">No complaints matching filter</p>
              </div>
            ) : (
              filteredComplaints.map((c) => (
                <div key={c.id} className="p-6 hover:bg-slate-700/30 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-blue-400">{c.id}</span>
                      <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-700 text-slate-300">
                        {c.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded text-xs font-extrabold ${
                          c.priority === "High"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {c.priority} Priority
                      </span>
                      <span className="text-xs text-slate-400">by {c.userEmail}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                      <MapPin size={16} className="text-blue-400 shrink-0" />
                      <span>{c.location}</span>
                    </div>

                    <p className="text-xs text-slate-300 max-w-3xl">{c.description}</p>
                    <p className="text-[11px] text-slate-500">{c.date}</p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400 mr-2">Update Status:</span>
                    <button
                      onClick={() => handleStatusChange(c.id, "Pending")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        c.status === "Pending"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                          : "border-slate-700 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleStatusChange(c.id, "In Progress")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        c.status === "In Progress"
                          ? "bg-blue-500/20 text-blue-300 border-blue-500/50"
                          : "border-slate-700 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusChange(c.id, "Resolved")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        c.status === "Resolved"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                          : "border-slate-700 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* ---------------- Broadcast Modal ---------------- */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-lg w-full p-6 border border-slate-700 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Radio className="text-amber-400 animate-pulse" size={20} />
                Send Emergency Broadcast
              </h3>
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {broadcastSent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 size={48} className="text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Broadcast Alert Dispatched!</h4>
                <p className="text-xs text-slate-400">Push notifications & SMS sent to registered citizens in {broadcastZone}.</p>
              </div>
            ) : (
              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Target Zone
                  </label>
                  <select
                    value={broadcastZone}
                    onChange={(e) => setBroadcastZone(e.target.value)}
                    className="w-full h-11 px-3 border border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 bg-slate-900 text-white"
                  >
                    <option value="All Zones">All City Zones</option>
                    <option value="Zone 4 - South (Critical)">Zone 4 - South (Critical)</option>
                    <option value="Zone 2 - Central (Moderate)">Zone 2 - Central (Moderate)</option>
                    <option value="Zone 1 - North">Zone 1 - North</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Alert Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Enter urgent safety instructions for citizens..."
                    className="w-full p-3 border border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 bg-slate-900 text-white resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBroadcastModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-sm font-semibold text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-bold hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-600/30"
                  >
                    <Send size={16} />
                    Send Broadcast Now
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
