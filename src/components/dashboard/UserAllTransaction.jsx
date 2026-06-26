

"use client";

import React from "react";
import { Card, Chip, Table } from "@heroui/react";
import {
  FaUserTie,
  FaMoneyBillWave,
  FaReceipt,
  FaCalendarAlt,
} from "react-icons/fa";

const UserAllTransaction = ({ transactions }) => {
  return (
    <Card className="p-6 shadow-xl rounded-none mt-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-2xl font-bold text-[#1E3A8A]">
            Transaction History
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Total Transactions: {transactions?.length || 0}
          </p>
        </div>
      </div>

      <Table removeWrapper>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Transaction History"
            className="min-w-[850px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>
                <div className="flex items-center gap-2">
                  <FaUserTie />
                  Lawyer
                </div>
              </Table.Column>

              <Table.Column>
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave />
                  Amount
                </div>
              </Table.Column>

              <Table.Column>
                <div className="flex items-center gap-2">
                  <FaReceipt />
                  Transaction ID
                </div>
              </Table.Column>

              <Table.Column>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  Date
                </div>
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
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaUserTie className="text-[#1E3A8A]" />
                      </div>

                      <div>
                        <p className="font-semibold">
                          {transaction.title}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip color="success" variant="flat">
                      ${transaction.amount}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="font-mono text-sm">
                      {transaction.paymentIntentId}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
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

export default UserAllTransaction;