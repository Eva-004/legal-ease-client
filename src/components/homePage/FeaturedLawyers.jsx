"use client";

import { motion } from "framer-motion";
import LawyerCard from "../ui/LawyerCard";


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const FeaturedLawyers = ({ lawyers }) => {
  return (
    <section className="py-20">
      <div className="w-11/12 mx-auto">

        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]">
            Featured Lawyers
          </h2>
          <p className="text-gray-500 mt-3">
            Connect with experienced and trusted legal experts
          </p>
        </motion.div>

        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {lawyers?.map((lawyer) => (
            <motion.div
              key={lawyer._id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <LawyerCard lawyer={lawyer}></LawyerCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedLawyers;