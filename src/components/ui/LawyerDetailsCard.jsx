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
import HireConfirmModal from "./HireConfirmModal";
import UserComment from "./UserComment";
import { authClient } from "@/lib/auth-client";

const LawyerDetailsCard = ({ lawyer }) => {
    const userData = authClient.useSession();
    const user = userData?.data?.user;
    return (
        <div className="w-11/12 mx-auto py-10">

            <Card className="p-6 border border-default-200 shadow-md">

                <div className="flex flex-col md:flex-row gap-8">


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
                                    $ {lawyer.consultationFee}/hour
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

                        <div className="mt-5">
                            <h3 className="font-semibold text-lg mb-3 text-[#1E3A8A]">
                                Other Services
                            </h3>

                            {lawyer?.services?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {lawyer.services.map((service, index) => (
                                        <Chip
                                            key={index}
                                            color="primary"
                                            variant="flat"
                                        >
                                            {service.title}
                                        </Chip>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic text-sm">
                                    No extra services available yet.
                                </p>
                            )}
                        </div>
                        {user && <HireConfirmModal lawyer={lawyer} />}


                    </div>
                </div>
            </Card>

            {
                user && <UserComment lawyer={lawyer} />
            }

        </div>
    );
};

export default LawyerDetailsCard;