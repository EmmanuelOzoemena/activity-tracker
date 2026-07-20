import React, { useState } from "react";
import { useRegistrationStore } from "./store/useRegistrationStore";
import { campService } from "./services/campService";
import {
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  Phone,
  Calendar,
  Clock,
  Copy,
  Check,
  Sparkles,
  Loader2,
  FileCheck,
} from "lucide-react";

const AVAILABLE_ACTIVITIES = [
  "Academic Classes",
  "Skills Acquisition",
  "Web Development",
  "Games",
  "Culinary Arts",
  "Excursions",
];

export default function App() {
  const {
    parent,
    children,
    paymentProof,
    setParentInfo,
    addChild,
    removeChild,
    updateChild,
    setPaymentProof,
    calculateTotalFee,
  } = useRegistrationStore();

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("2119341001");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!paymentProof) {
      setErrorMessage("Please upload a payment receipt before submitting.");
      return;
    }

    try {
      setLoading(true);
      await campService.submitRegistration({
        parent,
        children,
        paymentProof,
      });
      setSubmitted(true);
    } catch (error: any) {
      console.error("Submission Error:", error);
      const message =
        error.response?.data?.message ||
        "Failed to submit registration. Please check your connection and try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-xl text-center space-y-5 border border-brand-100">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-brand-900 tracking-tight">
              Registration Submitted!
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Thank you for enrolling with{" "}
              <strong>Catholic Church of the Holy Spirit Omole</strong>. We have
              received your submission and will contact you shortly.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-bold transition duration-200 shadow-md cursor-pointer"
          >
            Register Another Participant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50/50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-100/80">
        {/* Header / Banner Branding */}
        <div className="bg-gradient-to-b from-brand-900 to-brand-800 text-white p-6 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10">
            <Sparkles className="w-48 h-48 text-white" />
          </div>

          <p className="text-xs tracking-widest font-bold uppercase text-brand-100/90">
            Catholic Church of the Holy Spirit Omole, Phase 1, Lagos
          </p>
          <p className="text-[11px] text-brand-100/70 font-medium tracking-wide mt-1">
            Salesians of Don Bosco ANN Province
          </p>

          <h1 className="text-3xl sm:text-5xl font-black mt-5 tracking-tight uppercase leading-none">
            Summer Camp <span className="text-brand-100 font-mono">2026</span>
          </h1>

          <p className="mt-3 text-brand-100 italic font-medium text-xs sm:text-sm max-w-xl mx-auto">
            Theme: “Do Whatever He Tells You — Believers Free to Serve”
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/10 font-medium">
            <div className="flex items-center gap-2 justify-center">
              <Calendar className="w-4 h-4 text-brand-100" />
              <span>3rd - 28th August 2026</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4 text-brand-100" />
              <span>Mon. - Fri. (8:30 AM - 3:00 PM)</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
          {/* Parent/Guardian Details */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-brand-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center font-mono">
                1
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-900 tracking-tight">
                Parent / Guardian Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={parent.parentName}
                  onChange={(e) =>
                    setParentInfo({ parentName: e.target.value })
                  }
                  placeholder="e.g. Mr. John Doe"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:outline-none transition bg-gray-50/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  value={parent.phone}
                  onChange={(e) => setParentInfo({ phone: e.target.value })}
                  placeholder="08012345678"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:outline-none transition bg-gray-50/30 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={parent.whatsapp}
                  onChange={(e) => setParentInfo({ whatsapp: e.target.value })}
                  placeholder="08012345678"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:outline-none transition bg-gray-50/30 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={parent.email}
                  onChange={(e) => setParentInfo({ email: e.target.value })}
                  placeholder="parent@example.com"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:outline-none transition bg-gray-50/30"
                />
              </div>
            </div>
          </section>

          {/* Children Registration Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center border-b border-brand-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center font-mono">
                  2
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-brand-900 tracking-tight">
                  Child Details
                </h2>
              </div>
              <button
                type="button"
                onClick={addChild}
                className="flex items-center gap-1.5 text-xs bg-brand-100 text-brand-800 font-bold px-3.5 py-2 rounded-xl hover:bg-brand-600 hover:text-white transition duration-200 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" /> Add Child
              </button>
            </div>

            {children.map((child, index) => (
              <div
                key={child.id}
                className="p-5 border border-gray-200/80 rounded-2xl bg-gray-50/50 space-y-4 relative"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700 font-mono">
                    Child #{index + 1}
                  </span>
                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChild(child.id)}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={child.fullName}
                      onChange={(e) =>
                        updateChild(child.id, { fullName: e.target.value })
                      }
                      placeholder="Child's full name"
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-600 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                      Age
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      max="18"
                      value={child.age}
                      onChange={(e) =>
                        updateChild(child.id, { age: Number(e.target.value) })
                      }
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-600 focus:outline-none transition font-mono"
                    />
                  </div>
                </div>

                {/* Dynamic Fee Tier Info */}
                <div className="text-xs px-3.5 py-2 rounded-xl bg-brand-50 border border-brand-100 text-brand-900 font-medium flex justify-between items-center">
                  <span>Pricing Category:</span>
                  <span className="font-bold font-mono text-brand-700">
                    {child.age < 6
                      ? "Below 5 Years — ₦30,000"
                      : "6 Years & Above — ₦10,000"}
                  </span>
                </div>

                {/* Preferred Activities Checklist */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Interested Activities
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AVAILABLE_ACTIVITIES.map((act) => {
                      const checked = child.selectedActivities.includes(act);
                      return (
                        <label
                          key={act}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium cursor-pointer border transition-all duration-150 ${
                            checked
                              ? "bg-brand-800 text-white border-brand-800 shadow-xs"
                              : "bg-white text-gray-700 border-gray-200 hover:border-brand-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={checked}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...child.selectedActivities, act]
                                : child.selectedActivities.filter(
                                    (a) => a !== act,
                                  );
                              updateChild(child.id, {
                                selectedActivities: updated,
                              });
                            }}
                          />
                          <span className="select-none">{act}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Payment & Transfer Info Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-brand-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center font-mono">
                3
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-900 tracking-tight">
                Fee & Payment Transfer
              </h2>
            </div>

            <div className="bg-brand-900 text-white p-6 rounded-3xl space-y-4 shadow-inner">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-4">
                <p className="text-xs text-brand-100/80 uppercase tracking-wider font-bold">
                  Total Registration Fee
                </p>
                <p className="text-3xl font-black text-white font-mono tracking-tight">
                  ₦{calculateTotalFee().toLocaleString()}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-brand-100/70 font-medium">
                    Bank Name
                  </span>
                  <span className="font-bold text-white">UBA</span>
                </div>

                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="text-brand-100/80 font-medium">
                    Account Number
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base tracking-wider text-white">
                      2119341001
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAccountNumber}
                      className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-start pt-1">
                  <span className="text-brand-100/70 font-medium">
                    Account Name
                  </span>
                  <span className="font-bold text-white text-right max-w-[220px]">
                    Catholic Church of the Holy Spirit - Don Bosco Youth Centre
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-100/70 font-medium">
                    Payment Narration
                  </span>
                  <span className="font-bold text-white font-mono">
                    Summer Camp
                  </span>
                </div>
              </div>
            </div>

            {/* Upload Proof */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Upload Payment Receipt / Proof of Transfer
              </label>
              <div
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition duration-200 ${
                  paymentProof
                    ? "border-emerald-500 bg-emerald-50/30"
                    : "border-gray-200 hover:border-brand-600 bg-gray-50/30"
                }`}
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setPaymentProof(e.target.files ? e.target.files[0] : null)
                  }
                  className="hidden"
                  id="receipt-upload"
                />
                <label
                  htmlFor="receipt-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      paymentProof
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-brand-50 text-brand-700"
                    }`}
                  >
                    {paymentProof ? (
                      <FileCheck className="w-5 h-5" />
                    ) : (
                      <Upload className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">
                    {paymentProof
                      ? `Selected: ${paymentProof.name}`
                      : "Click to upload receipt image or PDF"}
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {errorMessage}
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-700 hover:bg-brand-800 disabled:bg-brand-400 text-white text-base font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Registration...</span>
              </>
            ) : (
              <span>
                Complete Registration (₦{calculateTotalFee().toLocaleString()})
              </span>
            )}
          </button>

          {/* Contact Details */}
          <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100 space-y-1">
            <p className="font-bold text-gray-700 flex items-center justify-center gap-1">
              <Phone className="w-3.5 h-3.5 text-brand-700" /> For Enquiries:
            </p>
            <p className="font-mono tracking-wide text-gray-600">
              08141211583 | 08167146040 | 07069328512
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
