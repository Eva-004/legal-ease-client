import AllTransactions from '@/components/dashboard/admin/AllTransactions';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const AllTransactionPage =async () => {
    const {token} = await auth.api.getToken({
              headers: await headers()
          })
          console.log(token);
           const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/transaction`,{
                headers: {
                 authorization: `Bearer ${token}`
              }
        });
        const transactions = await res.json();
    return (
        <div>
            <AllTransactions transactions={transactions}/>
        </div>
    );
};

export default AllTransactionPage;