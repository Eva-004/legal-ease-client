import LayerServices from '@/components/dashboard/lawyer/LayerServices';
import ManageLegalProfile from '@/components/dashboard/lawyer/ManageLegalProfile';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const LawyerProfilePage =async () => {
    const session = await auth.api.getSession({
            headers: await headers(),
          });
        const user = session?.user
        const {token} = await auth.api.getToken({
            headers: await headers()
        })
        console.log(token);
         const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/services/${user?.email}`,{
              headers: {
               authorization: `Bearer ${token}`
            }
      });
      const services = await res.json();
   
    return (
        <div className='space-y-4'>
            <ManageLegalProfile/>
            <LayerServices services={services}/>
        </div>
    );
};

export default LawyerProfilePage;