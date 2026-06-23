"use client";

import React from "react";
import { Card, Chip, Table, Button } from "@heroui/react";
import {
  FaGavel,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function HiringHistory({ hirings }) {
  const getStatusChip = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return (
          <Chip color="success" variant="flat">
            <FaCheckCircle size={12} />
            Accepted
          </Chip>
        );

      case "rejected":
        return (
          <Chip color="danger" variant="flat">
            <FaTimesCircle size={12} />
            Rejected
          </Chip>
        );

      default:
        return (
          <Chip color="warning" variant="flat">
            <FaClock size={12} />
            Pending
          </Chip>
        );
    }
  };

  return (
    <div className="w-full space-y-4 overflow-hidden">
     
      <div className="px-4 py-6 sm:px-6 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white/10">
            <FaGavel className="text-2xl sm:text-3xl text-yellow-300" />
          </div>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Hiring History
            </h1>

            <p className="mt-1 text-sm sm:text-base">
              Track your lawyer hiring requests and payment eligibility.
            </p>
          </div>
        </div>
      </div>

      
      <Card className="overflow-hidden rounded-3xl border-0 shadow-lg">
        <div className="border-b bg-slate-50 px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="text-base font-semibold text-[#1E3A8A] sm:text-lg">
            Your Hiring Requests
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            View the latest status of all lawyer hiring requests.
          </p>
        </div>

        {hirings?.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <Table>
                
      <Table.ScrollContainer>
              <Table.Content
                aria-label="Hiring History"
                className="min-w-[850px]"
              >
                <Table.Header>
                  <Table.Column isRowHeader>
                    LAWYER
                  </Table.Column>

                  <Table.Column>
                    SPECIALISATION
                  </Table.Column>

                  <Table.Column>
                    FEE
                  </Table.Column>

                  <Table.Column>
                    HIRING DATE
                  </Table.Column>

                  <Table.Column>
                    STATUS
                  </Table.Column>

                  <Table.Column>
                    ACTION
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {hirings.map((hire) => (
                    <Table.Row key={hire._id}>
                      <Table.Cell>
                        <p className="font-medium text-gray-800">
                          {hire.lawyerName}
                        </p>
                      </Table.Cell>

                      <Table.Cell>
                        {hire.specialisation}
                      </Table.Cell>

                      <Table.Cell>
                        <span className="font-semibold text-green-600">
                          ৳ {hire.fee}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        {new Date(
                          hire.hiringDate
                        ).toLocaleDateString()}
                      </Table.Cell>

                      <Table.Cell>
                        {getStatusChip(hire.status)}
                      </Table.Cell>

                      <Table.Cell>
                        {hire.status?.toLowerCase() ===
                        "accepted" ? (
                          <Button
                            size="sm"
                            color="success"
                            radius="full"
                          >
                            Pay Now
                          </Button>
                        ) : hire.status?.toLowerCase() ===
                          "pending" ? (
                          <span className="text-sm font-medium text-amber-500">
                            Waiting Approval
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-red-500">
                            Unavailable
                          </span>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content> 
      </Table.ScrollContainer>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-14 sm:px-6 sm:py-20">
            <div className="rounded-full bg-blue-50 p-5 sm:p-6">
              <FaGavel className="text-4xl text-[#1E3A8A] sm:text-5xl" />
            </div>

            <h3 className="mt-5 text-center text-lg font-semibold text-gray-800 sm:text-xl">
              No Hiring Requests Found
            </h3>

            <p className="mt-2 max-w-md text-center text-sm text-gray-500 sm:text-base">
              You haven&apos;t hired any lawyers yet. Once you send a
              hiring request, it will appear here.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}