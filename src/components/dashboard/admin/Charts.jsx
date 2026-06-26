"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const Charts = ({
  totalUsers,
  totalLawyers,
  totalHires,
  totalRevenue,
}) => {
  const data = [
    {
      name: "Users",
      value: totalUsers,
      color: "#3B82F6",
    },
    {
      name: "Lawyers",
      value: totalLawyers,
      color: "#8B5CF6",
    },
    {
      name: "Hires",
      value: totalHires,
      color: "#F97316",
    },
    {
      name: "Revenue",
      value: totalRevenue,
      color: "#22C55E",
    },
  ];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;