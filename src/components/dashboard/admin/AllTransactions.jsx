"use client";

import React from "react";
import { Card, Table, Chip } from "@heroui/react";
import {
  FaReceipt,
  FaEnvelope,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

const AllTransactions = ({ transactions }) => {
  return (
    <Card className="rounded-none shadow-xl p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1E3A8A]">
            All Transactions
          </h2>

          <p className="text-gray-500 mt-1">
            Total Transactions :{" "}
            <span className="font-semibold">
              {transactions?.length || 0}
            </span>
          </p>
        </div>
      </div>

      <Table >
        <Table.ScrollContainer>
          <Table.Content
            aria-label="All Transactions"
            className="min-w-[850px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>
                Transaction ID
              </Table.Column>

              <Table.Column>
                User Email
              </Table.Column>

              <Table.Column>
                Amount
              </Table.Column>

              <Table.Column>
                Date
              </Table.Column>
            </Table.Header>

            <Table.Body
              emptyContent={
                <div className="py-10 text-center text-gray-500">
                  No Transactions Found
                </div>
              }
            >
              {transactions?.map((transaction) => (
                <Table.Row key={transaction._id}>
                  {/* Transaction ID */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaReceipt className="text-blue-600" />
                      </div>

                      <span className="font-mono text-sm">
                        {transaction.paymentIntentId}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Email */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-green-600" />

                      <span className="text-gray-700">
                        {transaction.userEmail}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Amount */}
                  <Table.Cell>
                    <Chip
                      color="success"
                      variant="flat"
                    >
                     <FaMoneyBillWave />
                      ${transaction.amount}
                    </Chip>
                  </Table.Cell>

                  {/* Date */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-orange-500" />

                      {new Date(
                        transaction.createdAt
                      ).toLocaleDateString()}
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

export default AllTransactions;