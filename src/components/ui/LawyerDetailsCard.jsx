"use client";

import React from "react";
import { Card, Chip, Button } from "@heroui/react";

import {
    FaUserTie,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaGavel,
    FaHandHoldingHeart,
} from "react-icons/fa";

import { MdVerified } from "react-icons/md";
import Image from "next/image";

const LawyerDetailsCard = ({ lawyer }) => {

    return (
        <div className="w-11/12 mx-auto py-10">

            <Card className="p-6 border border-default-200 shadow-md">

                <div className="flex flex-col md:flex-row gap-8">

                    {/* IMAGE FIXED */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="w-24 h-24 relative">
                            <Image
                                src={lawyer.image}
                                alt={lawyer.name}
                                fill
                                className="rounded-full object-cover border"
                            />
                        </div>

                        <Chip
                            color="danger"
                            variant="flat"
                            size="sm"
                            className="mt-2"
                        >
                            {lawyer.status}
                        </Chip>
                    </div>

                    {/* INFO */}
                    <div className="flex-1 space-y-4">

                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <FaUserTie className="text-[#1E3A8A]" />
                            {lawyer.name}
                            <MdVerified className="text-green-500" />
                        </h1>

                        <p className="text-gray-600 flex items-center gap-2">
                            <FaGavel />
                            {lawyer.specialization}
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            {lawyer.bio}
                        </p>

                        <div className="flex flex-wrap gap-6 mt-4 text-sm">

                            <div className="flex items-center gap-2">
                                <FaMoneyBillWave className="text-green-500" />
                                <span className="font-semibold">
                                    BDT {lawyer.consultationFee}/hour
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-purple-500" />
                                <span>
                                    Joined:{" "}
                                    {new Date(lawyer.createdAt).toDateString()}
                                </span>
                            </div>

                        </div>

                        {/* HIRE BUTTON UPDATED */}
                        <Button
                            
                            size="lg"
                            className="mt-6 bg-[#1E3A8A] font-semibold flex items-center gap-2"
                        >
                            <FaHandHoldingHeart className="text-pink-200" />
                            Hire Lawyer
                        </Button>

                    </div>
                </div>
            </Card>

            {/* STATUS CARD */}
            <div className="mt-10 grid md:grid-cols-2 gap-6">

                <Card className="p-5 border border-default-200">
                    <h3 className="text-xl font-semibold mb-3">
                        Availability
                    </h3>

                    <p className="text-gray-500">
                        {lawyer.status === 'Busy'
                            ? "Currently busy with ongoing cases"
                            : "Available for new clients"}
                    </p>
                </Card>

            </div>
        </div>
    );
};

export default LawyerDetailsCard;