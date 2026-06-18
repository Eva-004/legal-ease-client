'use client'

import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import NavLink from "./NavLink";


const Navbar = () => {
const links = <>
        <li><NavLink href={'/'}>Home</NavLink></li>
        <li><NavLink href={'/lawyers'}>Browse Lawyers</NavLink></li>
    </>


return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">

                <div className="flex items-center gap-10">

                    <Link href="/" className="flex items-center gap-3">
                       <Image src={'/images/logo.jpg'} alt="logo" width={50} height={50} className="object-cover rounded-full" />

                        <div>
                            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]  bg-clip-text text-transparent">
                                LegalEase
                            </h1>
                           
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </nav>
                </div>

                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <IoSearchOutline
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search lawyers, specialization..."
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">


                            <Link href="/login">
                                <button className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                    Login
                                </button>
                            </Link>

                            <Link href="/register">
                                <button className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#2563EB] text-white font-medium transition shadow-md">
                                    Register
                                </button>
                            </Link>
                       
                    
                </div>

                <div className="dropdown dropdown-end md:hidden">

                    <label
                        tabIndex={0}
                        className="btn btn-ghost"
                    >
                        <GiHamburgerMenu size={22} />
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu dropdown-content mt-3 p-4 shadow-xl bg-white dark:bg-slate-900 rounded-2xl w-72 border border-slate-200 dark:border-slate-800 z-[100]"
                    >

                        <li className="mb-3">
                            <input
                                type="text"
                                placeholder="Search lawyers..."
                                className="input input-bordered w-full"
                            />
                        </li>

                        {links}

                                <li>
                                    <Link href="/login">
                                        Login
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/register">
                                        Register
                                    </Link>
                                </li>
                    </ul>
                </div>

            </div>
        </div>
    </nav>
);

};

export default Navbar;
