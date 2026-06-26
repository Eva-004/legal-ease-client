"use client";

import React from "react";
import { Card } from "@heroui/react";
import {
  FaUsers,
  FaUserTie,
  FaMoneyCheckAlt,
  FaChartLine,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    title: "Manage Users",
    description: "View users, update roles and remove accounts.",
    icon: <FaUsers className="text-3xl text-blue-600" />,
  },
  {
    title: "All Transactions",
    description: "Monitor payments and transaction history.",
    icon: <FaMoneyCheckAlt className="text-3xl text-green-600" />,
  },
  {
    title: "Analytics",
    description: "Track users, lawyers, hires and revenue.",
    icon: <FaChartLine className="text-3xl text-orange-500" />,
  },
  {
    title: "Lawyer Management",
    description: "Manage lawyer accounts and activities.",
    icon: <FaUserTie className="text-3xl text-purple-600" />,
  },
];

const AdminPage = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="rounded-none shadow-lg border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-4xl text-[#1E3A8A]" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A8A]">
                Admin Dashboard
              </h1>
            </div>

            <p className="text-gray-600 leading-7">
              Welcome to the administration panel. Manage users, monitor
              transactions, review analytics and maintain the overall platform
              from one place.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl px-8 py-6 text-center">
            <p className="text-gray-500 text-sm">System Status</p>

            <h2 className="text-2xl font-bold text-green-600 mt-2">
              ● Online
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              Everything is running normally.
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Access */}
      <div className="px-4">
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-5">
          Quick Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((item) => (
            <Card
              key={item.title}
              className="rounded-none p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="space-y-4">
                {item.icon}

                <h3 className="text-lg font-semibold">{item.title}</h3>

                <p className="text-sm text-gray-500">
                  {item.description}
                </p>

                
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;