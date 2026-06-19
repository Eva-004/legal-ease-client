'use client'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    const pathName = usePathname();
        if(pathName.includes("dashboard")){
            return null;
        }
    return (
        <footer className='bg-[#101727] pt-20 pb-10'>
            <div className='w-10/12 mx-auto'>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-10 text-white'>

                    <div>
                        <Image
                            src={'/images/logo.jpg'}
                            alt="footer logo"
                            width={80}
                            height={80}
                            className='object-cover bg-white rounded-lg'
                        />
                        <h2 className='font-bold text-3xl mt-3'>LegalEase</h2>
                        <p className='text-sm text-gray-400 mt-2'>
                            Find trusted lawyers instantly with secure booking and verified profiles.
                        </p>
                    </div>

                    <div className='space-y-3'>
                        <p className='font-bold text-xl'>Quick Links</p>
                        <ul className='space-y-2 text-gray-300'>
                            <li><Link href='/'>Home</Link></li>
                            <li><Link href='/about'>About</Link></li>
                            <li><Link href='/contact'>Contact</Link></li>
                            <li><Link href='/privacy-policy'>Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className='space-y-3'>
                        <h2 className='font-bold text-xl'>Contact Info</h2>
                        <div className='space-y-2 text-gray-300'>
                            <p>Location: Sylhet, Bangladesh</p>
                            <p>Phone: 017xxxxxxxxx</p>
                            <p>Email: support@legalease.com</p>
                        </div>

                        <div className='flex gap-3 mt-4'>
                            <a href="#"><AiFillInstagram className='w-5 h-5' /></a>
                            <a href="#"><FaFacebookSquare className='w-5 h-5' /></a>
                            <a href="#"><FaXTwitter className='w-5 h-5' /></a>
                        </div>
                    </div>

                    <div className='space-y-3'>
                        <h2 className='font-bold text-xl'>Newsletter</h2>
                        <p className='text-gray-400 text-sm'>
                            Get legal updates and lawyer tips.
                        </p>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className='w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white'
                        />

                        <button className='w-full mt-2 bg-[#2563EB] hover:bg-[#1E3A8A] transition py-2 rounded-xl font-medium'>
                            Subscribe
                        </button>
                    </div>

                </div>

                <div className='border-t border-slate-700 mt-12 pt-6 flex flex-col md:flex-row justify-between text-gray-400 text-sm'>
                    <p>© 2026 LegalEase. All rights reserved.</p>

                    <div className='flex gap-4 mt-2 md:mt-0'>
                        <p>Privacy Policy</p>
                        <p>Terms</p>
                        <p>Cookies</p>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;