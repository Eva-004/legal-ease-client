"use client";

import React from "react";
import {
  Card,
  Table,
  Button,
  Chip,
} from "@heroui/react";

import {
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEdit,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const HiringRequests = ({ hirings }) => {
  console.log(hirings)
  const handleAccept = async (id) => {
    console.log("Clicked", id);
    const { data: tokenData } = await authClient.token();
    console.log(tokenData);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/hire-lawyer/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({
          status: "accepted",
        }),
      }
    );

    if (res.ok) {
      toast.success("Request accepted");
    } else {
      toast.error("Failed to accept request");
    }
  };

  const handleReject = async (id) => {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/hire-lawyer/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({
          status: "rejected",
        }),
      }
    );

    if (res.ok) {
      toast.success("Request rejected");
    } else {
      toast.error("Failed to reject request");
    }
  };


  return (
    <div className="p-4 md:p-6">
      <Card className="p-5">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <FaUser className="text-primary text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Hiring Requests
            </h1>

            <p className="text-default-500 text-sm">
              Review and manage hiring requests from users
            </p>
          </div>
        </div>

        {/* Table */}
        <Table aria-label="Hiring Requests">
          <Table.ScrollContainer>
            <Table.Content className="min-w-[900px]">

              <Table.Header>
                <Table.Column isRowHeader>
                  CLIENT NAME
                </Table.Column>

                <Table.Column>
                  REQUEST DATE
                </Table.Column>


                <Table.Column>
                  ACTIONS
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent="No hiring requests found">
                {hirings.map((hiring) => (
                  <Table.Row key={hiring._id}>

                    {/* Client */}
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FaUser className="text-primary" />
                        </div>

                        <span className="font-medium">
                          {hiring.userName}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Date */}
                    <Table.Cell>
                      {new Date(
                        hiring.createdAt
                      ).toLocaleDateString()}
                    </Table.Cell>


                    {/* Actions */}
                    <Table.Cell>
                      <div className="flex flex-wrap gap-2">

                        {hiring.status === "pending" && (
                          <>
                            <Button
                              className="bg-green-700 text-white"
                              size="sm"
                              onClick={() => handleAccept(hiring._id)}
                            >
                              <FaCheckCircle />
                              Accept
                            </Button>

                            <Button
                              className="bg-red-500 text-white"
                              variant="flat"
                              size="sm"
                              onClick={() => handleReject(hiring._id)}
                            >
                              <FaTimesCircle />
                              Reject
                            </Button>
                          </>
                        )}

                        {hiring.status === "accepted" && (
                          <Chip color="success" variant="flat">
                            <div className="flex items-center gap-1">
                              <FaCheckCircle size={12} />
                              Accepted
                            </div>
                          </Chip>
                        )}

                        {hiring.status === "rejected" && (
                          <Chip color="danger" variant="flat">
                            <div className="flex items-center gap-1">
                              <FaTimesCircle size={12} />
                              Rejected
                            </div>
                          </Chip>
                        )}

                      </div>
                    </Table.Cell>

                  </Table.Row>
                ))}
              </Table.Body>

            </Table.Content>
          </Table.ScrollContainer>
        </Table>

      </Card>
    </div>
  );
};

export default HiringRequests;