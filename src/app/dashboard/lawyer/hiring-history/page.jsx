import HiringRequests from '@/components/dashboard/lawyer/HiringRequests';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const LawyerHiringRequestPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/hire-lawyer`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const hiringData = await res.json();
    const hirings = hiringData.filter(data => data.lawyerId === user?.id);
    console.log(hirings)
    return (
        <div>
            <HiringRequests hirings={hirings}/>
        </div>
    );
};

export default LawyerHiringRequestPage;