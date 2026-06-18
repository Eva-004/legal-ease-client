import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';
import React from 'react';

export const metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
}

const NotFoundPage = () => {
    return (
        <div className='text-center mb-40 mt-10 '>
            <div>
                <DotLottieReact
                    src="https://lottie.host/a0b0af1c-e4bf-47d9-a5a7-e1e269b927b9/1uI3VdkAbm.lottie"
                    loop
                    autoplay
                    className='w-80 h-80 mx-auto'
                />
                <Link href={"/"} className="px-5 py-2 border border-[#1E3A8A]rounded-full text-sm hover:bg-[#1E3A8A] hover:text-white transition"> Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;