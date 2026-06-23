import Link from "next/link";
import { FaGavel, FaBalanceScale, FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full  border border-slate-200 bg-slate-50 p-8 md:p-12 shadow-sm">

        <div className="max-w-4xl">
     
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 mb-6">
            <HiSparkles className="text-lg" />
            <span className="text-sm font-medium">
              Welcome to LegalEase
            </span>
          </div>

       
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Your Legal Journey,
            <span className="block text-[#1E3A8A]">
              Simplified.
            </span>
          </h1>

          
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl">
            Manage lawyer hiring, track consultation requests,
            and stay connected with trusted legal professionals
            through one secure platform.
          </p>

          
          <div className="mt-10 grid gap-4 sm:grid-cols-2">

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border">
              <FaGavel className="text-3xl text-amber-500" />
              <div>
                <h3 className="font-semibold text-slate-900">
                  Hire Lawyers
                </h3>
                <p className="text-sm text-slate-500">
                  Connect with verified legal experts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border">
              <FaBalanceScale className="text-3xl text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-900">
                  Track Requests
                </h3>
                <p className="text-sm text-slate-500">
                  Monitor all hiring activities easily.
                </p>
              </div>
            </div>

          </div>

       
          <Link href={'/lawyers'}>
           <button  className="mt-10 flex items-center gap-3 rounded-2xl bg-[#1E3A8A] px-6 py-3 text-white font-medium transition cursor-pointer hover:bg-[#1a3278]">
            Explore Lawyers
            <FaArrowRight />
          </button>
          </Link>
        </div>

      </div>
    </div>
  );
}