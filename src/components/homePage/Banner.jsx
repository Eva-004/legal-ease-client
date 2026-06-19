'use client';

import Image from "next/image";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FaBalanceScale, FaGavel, FaUserTie } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const Banner = () => {
    const slides = [
        {
            title: "Find & Hire Expert Legal Counsel",
            image: "/images/banner1.webp",
            description:
                "Connect with experienced lawyers for legal consultation, case representation, and trusted legal services.",
        },
        {
            title: "Trusted Legal Experts at Your Service",
            image: "/images/banner2.jpg",
            description:
                "Browse verified lawyers and law firms to find the right legal professional for your needs.",
        },
        {
            title: "Professional Legal Guidance Made Easy",
            image: "/images/banner3.jpg",
            description:
                "Get expert legal support for family, business, property, and corporate matters.",
        },
    ];

    return (
        <section className="relative h-[85vh] overflow-hidden">
            <Swiper
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                centeredSlides
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-[85vh] w-full">
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    priority={index === 0}
                                    className="object-cover"
                                />
                            </div>

                            <div className="absolute inset-0 bg-slate-900/35" />

                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-24 left-16 hidden lg:block z-10"
                            >
                                <FaBalanceScale className="text-amber-400 text-7xl opacity-20" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute right-20 top-32 hidden lg:block z-10"
                            >
                                <FaGavel className="text-amber-500 text-8xl opacity-20" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="absolute bottom-24 right-32 hidden lg:block z-10"
                            >
                                <FaUserTie className="text-amber-300 text-7xl opacity-20" />
                            </motion.div>

                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <div className="max-w-4xl text-center px-6">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                                    >
                                        {slide.description}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                    >
                                        <Link href={'/lawyers'}>
                                            <Button

                                                size="lg"
                                                className="font-semibold bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white hover:scale-105  transition-all duration-300 shadow-lg"
                                            >
                                                <span className="flex  items-center gap-2">
                                                    Browse Lawyers
                                                    <HiOutlineArrowRight className="text-xl" />
                                                </span>
                                            </Button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Banner;