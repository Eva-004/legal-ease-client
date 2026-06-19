"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

       
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/register.png"
                    alt="background"
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
                <h2 className="text-2xl font-bold text-center mb-6 text-slate-900">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />

                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#1E3A8A] text-white font-semibold"
                    >
                        Login
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="h-px bg-slate-300 flex-1" />
                        <span className="text-sm text-slate-500">OR</span>
                        <div className="h-px bg-slate-300 flex-1" />
                    </div>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-slate-50 transition"
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-slate-600">
                        Don’t have an account?{" "}
                        <Link href="/register" className="text-blue-600 font-medium">
                            Register
                        </Link>
                    </p>
                </form>
            </motion.div>

        </section>
    );
};

export default Login;