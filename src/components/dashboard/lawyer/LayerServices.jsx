"use client";

import { authClient } from "@/lib/auth-client";
import {
    Card,
    Button,
    Input,
    Table,
} from "@heroui/react";
import { useState } from "react";

import {
    FaPlus,
    FaBalanceScale,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import EditService from "./EditService";
import { useRouter } from "next/navigation";
import DeleteService from "./DeleteService";

const LayerServices = ({ services }) => {
    const router = useRouter();
    const [serviceName, setServiceName] = useState("");
    const [loading, setLoading] = useState(false);
    const session = authClient.useSession();
    const user = session?.data?.user;

    const handleAddService = async () => {
        if (!serviceName.trim()) {
        toast.error("Please enter a service name");
        return;
    }
        setLoading(true);

        const { data: tokenData } = await authClient.token();
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/services/${user?.email}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.token}`,
                },
                body: JSON.stringify({
                    service: serviceName,
                }),
            }
        );

        const data = await res.json();

        if (res.ok) {
            toast.success("Service Added Successfully");

            setServiceName("");
            setLoading(false);
           router.refresh();
        } else {
            toast.error("Something went wrong");
        }
    }

    const handleEditService = async(serviceId, updatedTitle)=>{
         setLoading(true);

        const { data: tokenData } = await authClient.token();
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/services/${user?.email}/${serviceId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.token}`,
                },
                body: JSON.stringify({
                    title: updatedTitle
                }),
            }
        );

        const data = await res.json();

        if (res.ok) {
            toast.success("Service Edit Successfully");

            setServiceName("");
            setLoading(false);
            router.refresh();
        } else {
            toast.error("Something went wrong");
        }
    }
    
   const handleDeleteService = async(serviceId)=>{
         setLoading(true);

        const { data: tokenData } = await authClient.token();
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/services/${user?.email}/${serviceId}`,
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
            toast.success("Service Deleted Successfully");

            setServiceName("");
            setLoading(false);
            router.refresh();
        } else {
            toast.error("Something went wrong");
        }
    }


    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            {/* Header */}

            <Card className="p-6 ">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                        <FaBalanceScale className="text-2xl text-primary" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">
                            Manage Legal Services
                        </h1>

                        <p className="text-default-500 text-sm">
                            Add, update and manage the legal
                            services you provide.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Add Service */}

            <Card className="p-5 ">
                <h2 className="font-semibold text-lg mb-4">
                    Add New Service
                </h2>

                <div className="flex flex-col md:flex-row gap-3">
                    <Input 
                        placeholder="Example: Family Law Consultation"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                    />

                    <Button
                        className={'bg-[#1E3A8A]'}
                        onClick={handleAddService}
                    >
                        <FaPlus />
                        Add Service
                    </Button>
                </div>
            </Card>


            {services?.length === 0 ? (
                <Card className="p-12 text-center">
                    <FaBalanceScale className="mx-auto text-6xl text-default-300 mb-4" />

                    <h2 className="text-xl font-bold">
                        No Services Added Yet
                    </h2>

                    <p className="text-default-500 mt-2">
                        Add your first legal service. It will
                        appear on your public lawyer profile.
                    </p>
                </Card>
            ) : (
                <Card className="p-4 shadow-md border">
                    <div className="mb-4">
                        <h2 className="font-semibold text-lg">
                            Your Legal Services
                        </h2>
                    </div>

                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content
                                aria-label="Legal Services"
                                className="min-w-[700px]"
                            >
                                <Table.Header>
                                    <Table.Column isRowHeader>#</Table.Column>

                                    <Table.Column>
                                        Service Name
                                    </Table.Column>

                                    <Table.Column>
                                        Added Date
                                    </Table.Column>

                                    <Table.Column>
                                        Actions
                                    </Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {services?.map((service, index) => (
                                        <Table.Row key={service.id}>
                                            <Table.Cell>
                                                {index + 1}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className="font-medium">
                                                    {service.title}
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                {new Date(service.createdAt).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className="flex items-center justify-between gap-2 px-2">
                                                   <EditService handleEditService={handleEditService} service={service}/>

                                                    <DeleteService handleDeleteService={handleDeleteService} service={service}/>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                </Card>
            )}
        </div>
    );
};

export default LayerServices;