"use client";

import React, { useState } from "react";
import { Table, Card, Button, Chip } from "@heroui/react";
import {
    FaUser,
    FaEnvelope,
    FaUserShield,
    FaUserEdit,
    FaTrashAlt,
} from "react-icons/fa";
import ChangeRole from "./ChangeRole";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import DeleteUser from "./DeleteUser";

const ManageUsers = ({ users }) => {
    const router = useRouter();
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const handleRoleChange = async (id, changedRole) => {
        setLoading(true);

        const { data: tokenData } = await authClient.token();
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.token}`,
                },
                body: JSON.stringify({
                    role: changedRole
                }),
            }
        );

        const data = await res.json();

        if (res.ok) {
            toast.success("Role Changed Successfully");

            setRole("");
            setLoading(false);
            router.refresh();
        } else {
            toast.error("Something went wrong");
        }
    }
    const handleDeleteUser = async(id)=>{
               setLoading(true);
      
              const { data: tokenData } = await authClient.token();
              const res = await fetch(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`,
                  {
                      method: "DELETE",
                      headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${tokenData.token}`,
                      }
                  }
              );
      
              const data = await res.json();
      
              if (res.ok) {
                  toast.success("User Deleted Successfully");
      
                  setRole("");
                  setLoading(false);
                  router.refresh();
              } else {
                  toast.error("Something went wrong");
              }
          }
    return (
        <Card className="rounded-none shadow-xl p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[#1E3A8A]">
                        Manage Users
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Total Users:{" "}
                        <span className="font-semibold">{users?.length || 0}</span>
                    </p>
                </div>
            </div>

            <Table >
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Manage Users"
                        className="min-w-[900px]"
                    >
                        <Table.Header>
                            <Table.Column isRowHeader>Name</Table.Column>
                            <Table.Column>Email</Table.Column>
                            <Table.Column>Role</Table.Column>
                            <Table.Column align="center">
                                Change Role
                            </Table.Column>
                            <Table.Column align="center">
                                Delete
                            </Table.Column>
                        </Table.Header>

                        <Table.Body
                            emptyContent={
                                <div className="py-10 text-gray-500">
                                    No Users Found
                                </div>
                            }
                        >
                            {users?.map((user) => (
                                <Table.Row key={user._id}>
                                    {/* Name */}
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                                                <FaUser className="text-blue-600" />
                                            </div>

                                            <span className="font-medium">
                                                {user.name}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    {/* Email */}
                                    <Table.Cell>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaEnvelope className="text-green-500" />
                                            {user.email}
                                        </div>
                                    </Table.Cell>

                                    {/* Role */}
                                    <Table.Cell>
                                        <Chip
                                            color={
                                                user.role === "lawyer"
                                                    ? "secondary"
                                                    : "primary"
                                            }
                                            variant="flat"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FaUserShield />
                                                {user.role}
                                            </div>
                                        </Chip>
                                    </Table.Cell>

                                    {/* Change Role */}
                                    <Table.Cell>
                                        <div className="flex justify-center">
                                            <ChangeRole handleRoleChange={handleRoleChange} user={user}></ChangeRole>
                                        </div>
                                    </Table.Cell>

                                    {/* Delete */}
                                    <Table.Cell>
                                        <div className="flex justify-center">
                                           <DeleteUser handleDeleteUser={handleDeleteUser} user={user}/>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </Card>
    );
};

export default ManageUsers;