"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FaHouse,
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



export default function DashboardSidebar() {
  
  const [open, setOpen] = useState(false);
 
   const userData = authClient.useSession();
      const user = userData?.data?.user;
  const role = user?.role || "user";
  const dashboardItems = {
   user: [
    { icon: FaHouse, label: "Home", href: "/" },
    { icon: FaUser, label: "Update Profile", href: "/dashboard/user/update-profile" },
    { icon: FaFileLines, label: "Hiring History", href: "/dashboard/user/hiring-history" },
    { icon: FaCommentDots, label: "Comments", href: "/dashboard/user/comments" },
  ],

  lawyer: [
    { icon: FaHouse, label: "Home", href: "/" },
    { icon: FaScaleBalanced, label: "Hiring Requests", href: "/dashboard/lawyer/hiring-history" },
    { icon: FaFileLines, label: "Manage Legal Profile", href: "/dashboard/lawyer/manage-legal-profile" },
  ],

  admin: [
    { icon: FaHouse, label: "Home", href: "/" },
    { icon: FaUsers, label: "Manage Users", href: "/dashboard/admin/manage-users" },
    { icon: FaCreditCard, label: "Transactions", href: "/dashboard/admin/all-transactions" },
    { icon: FaChartLine, label: "Analytics", href: "/dashboard/admin/analytics" },
  ],
};
  const navItems = dashboardItems[role] || dashboardItems.user;

  const NavList = <>
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        >
          <item.icon className="size-5 text-muted-foreground" />
          {item.label}
        </Link>
      ))}
    </nav>
  </>

  return (
    <>
      {/* Mobile Button */}
      <Button
        className="md:hidden block"
        variant="secondary"
        onPress={() => setOpen(true)}
      >
        <Bars />
        Menu
      </Button>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex bg-white w-60 border-r min-h-screen">
        <div className="w-full p-3">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/images/logo.jpg"
              width={50}
              height={50}
              alt="logo"
              className="rounded-full"
            />
            <h1 className="text-xl font-bold">LegalEase</h1>
          </div>

          {NavList}
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer isOpen={open} onOpenChange={setOpen}>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
                {NavList}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
}