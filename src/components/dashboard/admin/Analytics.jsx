"use client";

import React from "react";
import { Card } from "@heroui/react";
import {
    FaUsers,
    FaUserTie,
    FaHandshake,
    FaDollarSign,
} from "react-icons/fa";
import Charts from "./Charts";



const Analytics = ({ totalUsers, totalLawyers, totalHires, totalRevenue }) => {
    const stats = [
        {
            title: "Total Users",
            value: totalUsers,
            icon: <FaUsers className="text-3xl text-blue-600" />,
            bg: "bg-blue-100",
        },
        {
            title: "Total Lawyers",
            value: totalLawyers,
            icon: <FaUserTie className="text-3xl text-purple-600" />,
            bg: "bg-purple-100",
        },
        {
            title: "Total Hires",
            value: totalHires,
            icon: <FaHandshake className="text-3xl text-orange-500" />,
            bg: "bg-orange-100",
        },
        {
            title: "Total Revenue",
            value: `$${totalRevenue}`,
            icon: <FaDollarSign className="text-3xl text-green-600" />,
            bg: "bg-green-100",
        },
    ];

    return (
        <div className="space-y-8 px-4">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-[#1E3A8A]">
                    Analytics Overview
                </h1>

                <p className="text-gray-500 mt-2">
                    Monitor your platform statistics and overall performance.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((item) => (
                    <Card
                        key={item.title}
                        className="rounded-none border border-gray-200 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{item.title}</p>

                                <h2 className="text-4xl font-bold text-gray-800 mt-3">
                                    {item.value}
                                </h2>
                            </div>

                            <div
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg}`}
                            >
                                {item.icon}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Placeholder Section */}
            <Card className="rounded-none border border-dashed border-gray-300 shadow-sm p-12">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Analytics Charts
                    </h2>

                    <Charts totalUsers={totalUsers}
                        totalLawyers={totalLawyers}
                        totalHires={totalHires}
                        totalRevenue={totalRevenue} />
                </div>
            </Card>
        </div>
    );
};

export default Analytics;