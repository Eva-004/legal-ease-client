"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FaUser,
  FaFileLines,
  FaCommentDots,
  FaScaleBalanced,
  FaUsers,
  FaCreditCard,
  FaChartLine,
} from "react-icons/fa6";

import { Button, Drawer } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { Bars } from "@gravity-ui/icons";
import { RxDashboard } from "react-icons/rx";



export default function DashboardSidebar({role}) {
  
  const [open, setOpen] = useState(false);
 
  const dashboardItems = {
   user: [
    { icon: RxDashboard, label: "Dashboard", href: "/dashboard/user" },
    { icon: FaUser, label: "Update Profile", href: "/dashboard/user/update-profile" },
    { icon: FaFileLines, label: "Hiring History", href: "/dashboard/user/hiring-history" },
    { icon: FaCommentDots, label: "Comments", href: "/dashboard/user/comments" },
  ],

  lawyer: [
    { icon: RxDashboard, label: "Dashboard", href: "/dashboard/lawyer" },
    { icon: FaScaleBalanced, label: "Hiring Requests", href: "/dashboard/lawyer/hiring-history" },
    { icon: FaFileLines, label: "Manage Legal Profile", href: "/dashboard/lawyer/manage-legal-profile" },
  ],

  admin: [
    { icon: RxDashboard, label: "Dashboard", href: "/dashboard/admin" },
    { icon: FaUsers, label: "Manage Users", href: "/dashboard/admin/manage-users" },
    { icon: FaCreditCard, label: "Transactions", href: "/dashboard/admin/all-transactions" },
    { icon: FaChartLine, label: "Analytics", href: "/dashboard/admin/analytics" },
  ],
};

  const navItems = dashboardItems[role] || dashboardItems.user;

  const NavList = <>
    <nav className="flex flex-col  gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center text-white gap-3 rounded-xl px-3 py-2.5 text-sm  transition-colors hover:bg-neutral-500"
        >
          <item.icon className="size-5 text-muted-foreground" />
          {item.label}
        </Link>
      ))}
    </nav>
  </>

  return (
    <>
     
      <Button
        className="md:hidden mt-4 ml-4"
        variant="secondary"
        onPress={() => setOpen(true)}
      >
        <Bars  />
      </Button>

      
      <div className="hidden md:flex bg-[#1E3A8A]  w-60 border-r min-h-screen">
        <div className="w-full p-3">
        
          <div className="flex items-center  gap-3 mb-6">
            <Image
              src="/images/logo.jpg"
              width={50}
              height={50}
              alt="logo"
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-white">LegalEase</h1>
          </div>

          {NavList}
        </div>
      </div>

      
      <Drawer isOpen={open} onOpenChange={setOpen}  >
        <Drawer.Content placement="left" >
          <Drawer.Dialog className={'bg-[#1E3A8A]'}>
            <Drawer.Header className="flex flex-row items-center  gap-3 mb-6">
               <Image
              src="/images/logo.jpg"
              width={50}
              height={50}
              alt="logo"
              className="rounded-full"
            />
              <Drawer.Heading className="text-white">LegalEase</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body >
                {NavList}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
}