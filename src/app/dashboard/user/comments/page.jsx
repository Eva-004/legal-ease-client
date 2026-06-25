import UserComments from '@/components/dashboard/UserComments';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const UserCommentsPage = async() => {
    const session = await auth.api.getSession({
          headers: await headers(),
        });
      const user = session?.user
      console.log(user);
      console.log(user?.id)
      const {token} = await auth.api.getToken({
          headers: await headers()
      })
      console.log(token);
       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`,{
            headers: {
             authorization: `Bearer ${token}`
          }
    });
    const data = await res.json();
    const comments = data.filter(comment => comment.userId === user?.id)
    console.log(comments)
    return (
        <div>
            <UserComments comments={comments}/>
        </div>
    );
};

export default UserCommentsPage;