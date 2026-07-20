import { useEffect, useState } from "react";
import { campService } from "../services/campService";
import {
  Users,
  Search,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  DollarSign,
  ArrowLeft,
} from "lucide-react";

interface Child {
  _id?: string;
  fullName: string;
  age: number;
  gender?: string;
  selectedActivities: string[];
  fee: number;
}

interface Registration {
  _id: string;
  parentName: string;
  phone: string;
  whatsapp?: string;
  email: string;
  address?: string;
  children: Child[];
  totalFee: number;
  receiptUrl: string;
  status: "pending" | "verified" | "rejected";
  createdAt: string;
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await campService.getAllRegistrations();
      if (res.success) {
        setRegistrations(res.data);
      } else {
        setError("Failed to fetch registrations.");
      }
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError(
        err.response?.data?.message ||
          "Error connecting to server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter registrations by Parent Name, Phone, Email, or Child Name
  const filteredRegistrations = registrations.filter((item) => {
    const matchesSearch =
      item.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.children.some((child) =>
        child.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate quick metrics
  const totalCampers = registrations.reduce(
    (acc, cur) => acc + cur.children.length,
    0,
  );
  const totalRevenue = registrations.reduce(
    (acc, cur) => acc + cur.totalFee,
    0,
  );

  return (
    <div className="min-h-screen bg-brand-50/40 p-4 sm:p-8 font-sans antialiased text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-xs border border-brand-100">
          <div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Registration Form
              </a>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-900 tracking-tight">
              Camp Admin Dashboard
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Catholic Church of the Holy Spirit Omole — Summer Camp
            </p>
          </div>

          <button
            onClick={fetchRegistrations}
            disabled={loading}
            className="px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-800 text-xs font-bold rounded-xl transition cursor-pointer self-start sm:self-auto border border-brand-200"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Total Registrations
              </p>
              <p className="text-2xl font-black text-brand-900 font-mono">
                {registrations.length}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Total Enrolled Campers
              </p>
              <p className="text-2xl font-black text-brand-900 font-mono">
                {totalCampers}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Expected Revenue
              </p>
              <p className="text-2xl font-black text-brand-900 font-mono">
                ₦{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl border border-brand-100 shadow-xs flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search parent, child, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-600 focus:outline-none bg-gray-50/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs font-bold text-gray-600 whitespace-nowrap">
              Filter Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-600 font-semibold"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-brand-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-brand-700" />
              <p className="text-xs font-semibold">
                Loading registration records...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600 space-y-3">
              <p className="text-sm font-bold">{error}</p>
              <button
                onClick={fetchRegistrations}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-xl transition"
              >
                Try Again
              </button>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="p-12 text-center text-gray-500 space-y-2">
              <FileText className="w-10 h-10 mx-auto text-gray-300" />
              <p className="text-sm font-bold text-gray-700">
                No registrations found
              </p>
              <p className="text-xs text-gray-400">
                Try adjusting your search query or filter settings.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-brand-900 text-white font-mono uppercase text-[10px] tracking-wider">
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Parent / Guardian</th>
                    <th className="p-4 font-bold">Registered Children</th>
                    <th className="p-4 font-bold">Total Fee</th>
                    <th className="p-4 font-bold">Receipt</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredRegistrations.map((reg) => (
                    <tr
                      key={reg._id}
                      className="hover:bg-brand-50/30 transition"
                    >
                      {/* Date */}
                      <td className="p-4 align-top whitespace-nowrap text-gray-500 font-mono">
                        {new Date(reg.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Parent Details */}
                      <td className="p-4 align-top space-y-1">
                        <p className="font-bold text-gray-900 text-sm">
                          {reg.parentName}
                        </p>
                        <p className="text-gray-600 font-mono">{reg.phone}</p>
                        {reg.whatsapp && (
                          <p className="text-emerald-600 text-[11px] font-mono">
                            WA: {reg.whatsapp}
                          </p>
                        )}
                        <p className="text-gray-500 font-sans text-[11px]">
                          {reg.email}
                        </p>
                      </td>

                      {/* Children List */}
                      <td className="p-4 align-top space-y-2">
                        {reg.children.map((child, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1"
                          >
                            <div className="flex justify-between items-center gap-2">
                              <span className="font-bold text-brand-900">
                                {child.fullName}
                              </span>
                              <span className="text-[10px] font-bold font-mono bg-brand-100 text-brand-800 px-2 py-0.5 rounded-md">
                                Age {child.age}
                              </span>
                            </div>
                            {child.selectedActivities.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {child.selectedActivities.map((act, aIdx) => (
                                  <span
                                    key={aIdx}
                                    className="text-[9px] bg-white text-gray-600 border border-gray-200 px-1.5 py-0.5 rounded-md font-medium"
                                  >
                                    {act}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </td>

                      {/* Total Fee */}
                      <td className="p-4 align-top font-mono font-bold text-sm text-brand-900 whitespace-nowrap">
                        ₦{reg.totalFee.toLocaleString()}
                      </td>

                      {/* Payment Receipt Link */}
                      <td className="p-4 align-top whitespace-nowrap">
                        {reg.receiptUrl ? (
                          <a
                            href={reg.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-800 rounded-lg text-xs font-bold transition border border-brand-200"
                          >
                            <span>View Receipt</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">No File</span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="p-4 align-top whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            reg.status === "verified"
                              ? "bg-emerald-100 text-emerald-800"
                              : reg.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {reg.status === "verified" && (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                          {reg.status === "rejected" && (
                            <XCircle className="w-3 h-3" />
                          )}
                          {reg.status === "pending" && (
                            <Clock className="w-3 h-3" />
                          )}
                          {reg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
