'use client'

import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { useState } from "react";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const links = (
        <>
            <li><NavLink href={'/'}>Home</NavLink></li>
            <li><NavLink href={'/lawyers'}>Browse Lawyers</NavLink></li>
        </>
    );
    
     const loginRegister = <>
        <li><Link href={'/login'} >Login</Link></li>
        <li><Link href={'/register'} >Register</Link></li>

    </>
     const router = useRouter();
    const userData = authClient.useSession();
    const user = userData?.data?.user;
    console.log(user);

    const pathName = usePathname();
    if(pathName.includes("dashboard")){
        return null;
    }

    const handleLogOut = async () => {
        await authClient.signOut();
        toast.success('Logout successfully!')
        router.push('/login')
    }

    return (
        <nav className="sticky top-0 z-50 shadow bg-white/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex h-20 items-center justify-between">

                     <div className="md:hidden relative">

                        <button
                            onClick={() => setOpen(!open)}
                            className="btn btn-ghost"
                        >
                            {open ? (
                                <IoClose size={24} />
                            ) : (
                                <GiHamburgerMenu size={24} />
                            )}
                        </button>

                        {open && (
                            <div className="absolute left-0 mt-3 w-72 bg-white border shadow-xl rounded-xl p-4 z-50">

                                <input
                                    type="text"
                                    placeholder="Search lawyers..."
                                    className="input input-bordered w-full mb-3"
                                />

                                <ul className="space-y-2" onClick={() => setOpen(false)}>
                                    {links}

                                     {!user && loginRegister}
                                     {user && 
                                       <li><button onClick={handleLogOut}  className={'border-0 rounded-none block'}>Logout</button></li>
                                     }
                                </ul>

                            </div>
                        )}

                    </div>


                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/images/logo.jpg" alt="logo" width={50} height={50} className="rounded-full" />
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]">
                            LegalEase
                        </h1>
                    </Link>

                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal gap-4">
                            {links}
                        </ul>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search lawyers..."
                                className="w-full pl-11 pr-4 py-3 rounded-xl border"
                            />
                        </div>
                    </div>

                   {!user &&
                       <div className="hidden md:flex gap-3">
                        <Link href="/login">
                            <button className="px-5 py-2 rounded-xl border hover:border-0 hover:bg-[#1E3A8A] hover:text-white cursor-pointer hover:scale-105  transition-all duration-300 shadow-lg">Login</button>
                        </Link>
                        <Link href="/register">
                            <button className="px-5 py-2 rounded-xl bg-[#1E3A8A] text-white cursor-pointer hover:scale-105  transition-all duration-300 shadow-lg hover:bg-slate-200 hover:text-black">
                                Register
                            </button>
                        </Link>
                    </div>
                   }

                   { user &&
                        <div className=" flex gap-3">
                        
                            <ProfileDropdown handleLogOut={handleLogOut} image={user?.image} name={user?.name} email={user?.email} role={user?.role}></ProfileDropdown>
                        
                        
                    </div>
                   }

                   
                </div>
            </div>
        </nav>
    );
};

export default Navbar;