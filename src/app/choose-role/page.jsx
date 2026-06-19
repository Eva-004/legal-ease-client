"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import Image from "next/image";

const ChooseRole = () => {
    const router = useRouter();

    const selectRole = (role) => {
        console.log("Selected role:", role);
        router.push("/");
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
                <div className="absolute inset-0 bg-slate-600/50" />
            </div>

            <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center max-w-md w-full z-10">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">
                    Choose Your Role
                </h2>

                <div className="space-y-4">
                    <Button
                        onClick={() => selectRole("user")}
                        className="w-full bg-blue-600 text-white"
                    >
                        Continue as User (Client)
                    </Button>

                    <Button
                        onClick={() => selectRole("lawyer")}
                        className="w-full bg-slate-800 text-white"
                    >
                        Continue as Lawyer
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ChooseRole;