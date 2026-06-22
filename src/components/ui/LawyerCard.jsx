'use client'
import { Card, Avatar, Chip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    FaBriefcase,
    FaMoneyBillWave,
    FaArrowRight,
} from "react-icons/fa";
import { FcBriefcase } from "react-icons/fc";


const LawyerCard = ({ lawyer }) => {
    const router = useRouter();

    return (
        <Card

            onClick={() => router.push(`/lawyers/${lawyer._id}`)}
            className="
        p-5
        border border-default-200
        hover:border-primary
        hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        rounded-2xl
        cursor-pointer
      "
        >
            {/* Top */}
            <div className="flex justify-between items-start">
                <Image
                    src={lawyer.image}
                    alt={lawyer.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full border object-cover"
                />


                <Chip
                    color="danger"
                    variant="flat"
                    size="sm"
                >
                    {lawyer.status}
                </Chip>

            </div>

            {/* Content */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold line-clamp-1">
                    {lawyer.name}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-default-500">
                    <FcBriefcase size={14} />
                    <span className="text-sm">
                        {lawyer.specialization}
                    </span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                    <FaMoneyBillWave
                        size={14}
                        className="text-success"
                    />

                    <span className="font-medium">
                        BDT {lawyer.consultationFee}/hour
                    </span>
                </div>
            </div>

        </Card>
    );
};

export default LawyerCard;