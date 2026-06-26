"use client";

import React from "react";
import { Card, Avatar } from "@heroui/react";
import { FaTrophy } from "react-icons/fa";
import Image from "next/image";

const LegalExperts = ({ topLawyer }) => {
    return (
        <div className="mt-10 max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
                🏆 Top Legal Experts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topLawyer.map((lawyer) => (
                    <Card
                        key={lawyer._id}
                        className="rounded-none shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
                    >
                        <div className="flex flex-col items-center text-center">
                            <Image
                                src={lawyer?.image}
                                alt={lawyer.name}
                                width={80}
                                height={80}
                                className="w-20 h-20 rounded-full border object-cover"
                            />

                            <h3 className="mt-4 text-xl font-semibold">
                                {lawyer.name}
                            </h3>

                            <p className="text-gray-500 text-sm">
                                {lawyer.specialization}
                            </p>

                            <div className="mt-4 flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                                <FaTrophy className="text-yellow-600" />

                                <span className="font-semibold">
                                    {lawyer.totalHire} Hires
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LegalExperts;