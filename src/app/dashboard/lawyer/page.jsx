import { FaGavel, FaBalanceScale, FaUsers } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

export default function LawyerDashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full border border-slate-200 bg-slate-50 p-8 md:p-10 shadow-sm">

        <div className="max-w-4xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 mb-6">
            <HiSparkles className="text-lg" />
            <span className="text-sm font-medium">
              Welcome to LegalEase Lawyer Panel
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Manage Your
            <span className="block text-[#1E3A8A]">
              Legal Practice.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl">
            Handle client requests, showcase your legal expertise,
            and grow your professional presence through a secure and
            trusted platform.
          </p>

          {/* Cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl bg-white p-6 border shadow-sm hover:shadow-md transition">
              <FaUsers className="text-3xl text-blue-600 mb-4" />

              <h3 className="font-semibold text-slate-900 text-lg">
                Client Requests
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Review hiring requests and connect with clients
                seeking legal assistance.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border shadow-sm hover:shadow-md transition">
              <FaBalanceScale className="text-3xl text-amber-500 mb-4" />

              <h3 className="font-semibold text-slate-900 text-lg">
                Legal Services
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Manage your service details, fees, specialization,
                and professional information.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border shadow-sm hover:shadow-md transition sm:col-span-2 lg:col-span-1">
              <FaGavel className="text-3xl text-green-600 mb-4" />

              <h3 className="font-semibold text-slate-900 text-lg">
                Professional Growth
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Build trust with clients and strengthen your legal
                presence on the platform.
              </p>
            </div>

          </div>

          {/* Bottom Highlight */}
          <div className="mt-10 rounded-3xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Your Legal Expertise Matters
            </h3>

            <p className="mt-3 text-slate-600">
              LegalEase helps lawyers connect with clients, manage
              consultations efficiently, and maintain a professional
              legal profile — all from one centralized dashboard.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}