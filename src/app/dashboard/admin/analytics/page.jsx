import Analytics from '@/components/dashboard/admin/Analytics';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const AnalyticsPage = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/transaction`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const transactions = await res.json();
    const totalRevenue = transactions.reduce(
        (total, transaction) => total + Number(transaction.amount),
        0
    );

    console.log(totalRevenue);

    const resData = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await resData.json();
    const users = data.filter(user => user.role === "user");
    const lawyers = data.filter(user => user.role === "lawyer");
    const hires = data.filter(user => user.status === "busy");

    return (
        <div>
            <Analytics totalUsers={users.length}
                totalLawyers={lawyers.length}
                totalHires={hires.length}
                totalRevenue={totalRevenue} />
        </div>
    );
};

export default AnalyticsPage;