import { NextResponse } from 'next/server'

import { headers } from 'next/headers'
import { auth } from './lib/auth';
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
     const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
   if(!session){
    const currentPath = request.nextUrl.pathname;

    const loginUrl = new URL('/login',request.url);

    loginUrl.searchParams.set('redirect',currentPath)
    
    return NextResponse.redirect(loginUrl)
   }
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ['/dashboard/user','/dashboard/lawyer','/dashboard/admin'],
}