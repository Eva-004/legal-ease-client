'use client'
import { authClient } from "@/lib/auth-client";
import {ArrowRightFromSquare, Gear} from "@gravity-ui/icons";
import {Avatar, Dropdown, Label} from "@heroui/react";
const ProfileDropdown = ({handleLogOut,image,name,email,role}) => {
        const userData = authClient.useSession();
           const user = userData?.data?.user;
           console.log(user);
    return (
       <Dropdown>
  <Dropdown.Trigger className="rounded-full cursor-pointer">
    <Avatar>
      <Avatar.Image alt={name} src={user?.image} className="object-cover" />
      <Avatar.Fallback delayMs={600}>{name?.[0]}</Avatar.Fallback>
    </Avatar>
  </Dropdown.Trigger>

  <Dropdown.Popover>
    <div className="px-3 pt-3 pb-1">
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <Avatar.Image alt={name} src={image} className="object-cover" />
          <Avatar.Fallback delayMs={600}>{name?.[0]}</Avatar.Fallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>
    </div>

   
    <Dropdown.Menu>
      <Dropdown.Item key="dashboard" href={`/dashboard/${role}`}>
        <div className="flex items-center gap-2">
          <Gear className="size-4" />
          Dashboard
        </div>
      </Dropdown.Item>
      <Dropdown.Item
        key="logout"
        color="danger"
        onClick={handleLogOut}
      >
        <div className="flex items-center justify-between w-full">
          Log Out
          <ArrowRightFromSquare className="size-4 text-red-500" />
        </div>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown>
    );
};

export default ProfileDropdown;