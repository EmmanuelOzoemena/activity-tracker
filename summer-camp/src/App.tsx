import React, { useState } from "react";
import { useRegistrationStore } from "./store/useRegistrationStore";
import {
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  Phone,
  Calendar,
  Clock,
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
    setParentInfo,
    addChild,
    removeChild,
    updateChild,
    setPaymentProof,
    calculateTotalFee,
  } = useRegistrationStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-bold text-brand-900">
            Registration Submitted!
          </h2>
          <p className="text-gray-600 text-sm">
            Thank you for enrolling with{" "}
            <strong>Catholic Church of the Holy Spirit Omole</strong>. We have
            received your submission and will contact you shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-brand-700 text-white rounded-lg font-semibold hover:bg-brand-800 transition"
          >
            Register Another Participant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-100">
        {/* Header / Banner Branding */}
        <div className="bg-brand-800 text-white p-6 sm:p-8 text-center relative">
          <p className="text-xs tracking-widest font-bold uppercase text-brand-100">
            Catholic Church of the Holy Spirit Omole, Phase 1, Lagos
          </p>
          <p className="text-xs text-brand-100 mt-0.5">
            Salesians of Don Bosco ANN Province
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 tracking-tight uppercase">
            Summer Camp 2026
          </h1>
          <p className="mt-2 text-brand-100 italic font-medium text-sm sm:text-base">
            Theme: “Do Whatever He Tells You — Believers Free to Serve”
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-brand-900/50 p-4 rounded-xl border border-brand-600">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Calendar className="w-4 h-4 text-brand-100" />
              <span>3rd - 28th August 2026</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Clock className="w-4 h-4 text-brand-100" />
              <span>Mon. - Fri. (8:30 AM - 3:00 PM)</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Parent/Guardian Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 border-b border-brand-100 pb-2">
              1. Parent / Guardian Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
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
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  value={parent.phone}
                  onChange={(e) => setParentInfo({ phone: e.target.value })}
                  placeholder="08012345678"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={parent.whatsapp}
                  onChange={(e) => setParentInfo({ whatsapp: e.target.value })}
                  placeholder="08012345678"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={parent.email}
                  onChange={(e) => setParentInfo({ email: e.target.value })}
                  placeholder="parent@example.com"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Children Registration Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center border-b border-brand-100 pb-2">
              <h2 className="text-xl font-bold text-brand-900">
                2. Child Details
              </h2>
              <button
                type="button"
                onClick={addChild}
                className="flex items-center gap-1 text-xs bg-brand-100 text-brand-700 font-bold px-3 py-1.5 rounded-lg hover:bg-brand-600 hover:text-white transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Child
              </button>
            </div>

            {children.map((child, index) => (
              <div
                key={child.id}
                className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 space-y-4 relative"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                    Child #{index + 1}
                  </span>
                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChild(child.id)}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Pricing Banner Indicator */}
                <div className="text-xs px-3 py-1.5 rounded bg-brand-50 border border-brand-100 text-brand-800 font-medium">
                  Fee Tier:{" "}
                  {child.age < 6
                    ? "Below 5 Years — ₦30,000"
                    : "6 Years & Above — ₦10,000"}
                </div>

                {/* Preferred Activities Checklist */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Interested Activities (Select multiple):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AVAILABLE_ACTIVITIES.map((act) => {
                      const checked = child.selectedActivities.includes(act);
                      return (
                        <label
                          key={act}
                          className={`flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer border transition ${
                            checked
                              ? "bg-brand-800 text-white border-brand-800"
                              : "bg-white text-gray-700 border-gray-200"
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
                          <span>{act}</span>
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
            <h2 className="text-xl font-bold text-brand-900 border-b border-brand-100 pb-2">
              3. Fee & Payment Transfer
            </h2>

            <div className="bg-brand-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-xs text-brand-100 uppercase tracking-wider font-semibold">
                  Total Registration Fee
                </p>
                <p className="text-3xl font-black text-white mt-1">
                  ₦{calculateTotalFee().toLocaleString()}
                </p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl text-xs space-y-1 w-full sm:w-auto">
                <p>
                  <span className="text-brand-100 font-semibold">Bank:</span>{" "}
                  UBA
                </p>
                <p>
                  <span className="text-brand-100 font-semibold">
                    Account No:
                  </span>{" "}
                  2119341001
                </p>
                <p>
                  <span className="text-brand-100 font-semibold">
                    Account Name:
                  </span>{" "}
                  Catholic Church of the Holy Spirit - Don Bosco Youth Centre
                </p>
                <p>
                  <span className="text-brand-100 font-semibold">
                    Narration:
                  </span>{" "}
                  Summer Camp
                </p>
              </div>
            </div>

            {/* Proof of Payment Upload */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Upload Payment Receipt / Proof of Transfer
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-brand-600 transition bg-gray-50/50">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  required
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
                  <Upload className="w-6 h-6 text-brand-600" />
                  <span className="text-xs text-gray-600 font-medium">
                    Click to upload receipt image or PDF
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-4 bg-brand-700 hover:bg-brand-800 text-white text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer active:scale-[0.99]"
          >
            Complete Registration (₦{calculateTotalFee().toLocaleString()})
          </button>

          {/* Flyer Footnote / Enquiries */}
          <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100 space-y-1">
            <p className="font-semibold text-gray-700 flex items-center justify-center gap-1">
              <Phone className="w-3.5 h-3.5 text-brand-700" /> For Enquiries:
            </p>
            <p>08141211583 | 08167146040 | 07069328512</p>
          </div>
        </form>
      </div>
    </div>
  );
}
