"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";

const Register = () => {
    const router = useRouter();

    const handleRegister = (e) => {
        e.preventDefault();

        const fakeJWT = "token123";

        if (fakeJWT) {
            router.push("/choose-role");
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4">
            
            
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/register.png"
                    alt="register background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-600/40" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg" />
                    <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
                    <input type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-lg" />
                    <input type="password" placeholder="Confirm Password" className="w-full px-4 py-3 border rounded-lg" />

                    <Button type="submit" className="w-full bg-[#1E3A8A] text-white">
                        Register
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="h-px bg-slate-300 flex-1" />
                        <span className="text-sm">OR</span>
                        <div className="h-px bg-slate-300 flex-1" />
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg cursor-pointer">
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    <p className="text-center text-sm">
                        Already have account?{" "}
                        <Link href="/login" className="text-blue-600">
                            Login
                        </Link>
                    </p>
                </form>
            </motion.div>
        </section>
    );
};

export default Register;