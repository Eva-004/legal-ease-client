"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { FaGavel, FaBuilding, FaUsers, FaHome, FaShieldAlt, FaMoneyBill } from "react-icons/fa";

const categories = [
    { name: "Criminal Law", category: "criminal", icon: <FaGavel /> },
    { name: "Corporate Law", category: "corporate", icon: <FaBuilding /> },
    { name: "Family Law", category: "family", icon: <FaUsers /> },
    { name: "Property Law", category: "property", icon: <FaHome /> },
    { name: "Cyber Law", category: "cyber", icon: <FaShieldAlt /> },
    { name: "Tax Law", category: "tax", icon: <FaMoneyBill /> },
];

const LegalCategories = () => {
    return (
        <section className="bg-slate-200 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-center mb-10"
                >
                    Legal Categories
                </motion.h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={`/lawyers?category=${cat.category}`}
                                className="block bg-white rounded-xl p-4 text-center shadow hover:bg-blue-50 transition"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-2xl text-blue-700">
                                        {cat.icon}
                                    </span>
                                    <p className="font-medium text-slate-800">
                                        {cat.name}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LegalCategories;