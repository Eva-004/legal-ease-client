import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export default async function DashboardLayout({ children }) {
     const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user?.role ?? "user";
  return (
    <div className="flex h-screen ">
      <div className="flex flex-1 overflow-hidden">
       <DashboardSidebar/>
      <div className="flex-1 overflow-y-auto">
          <DashboardNavbar role={role}/>
        <main >{children}</main>
      </div>
      </div>
    </div>
  );
}
