import HiringHistory from '@/components/dashboard/HiringHistory';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const HiringHistoryPage =async () => {
     const session = await auth.api.getSession({
        headers: await headers(),
      });
    const user = session?.user
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token);
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/hire-lawyer/`,{
          headers: {
           authorization: `Bearer ${token}`
        }
  });
  const HiringData = await res.json();
   const hirings = HiringData.filter(data => data.userId === user?.id);
   console.log(hirings)
    return (
        <div>
           <HiringHistory hirings={hirings}/> 
        </div>
    );
};

export default HiringHistoryPage;