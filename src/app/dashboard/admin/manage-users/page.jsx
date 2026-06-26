import ManageUsers from '@/components/dashboard/admin/ManageUsers';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const ManageUsersPage =async () => {
    const {token} = await auth.api.getToken({
              headers: await headers()
          })
          console.log(token);
           const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`,{
                headers: {
                 authorization: `Bearer ${token}`
              }
        });
        const data = await res.json();
        const users = data.filter(user => user.role !=="admin")
    return (
        <div>
            <ManageUsers users={users}/>
        </div>
    );
};

export default ManageUsersPage;