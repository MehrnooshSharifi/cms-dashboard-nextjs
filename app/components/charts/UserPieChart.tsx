"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";

const COLORS = ["#0088FE", "#00C49F"];

export default function UserPieChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const res = await fetch("/api/users/stats");
      if (!res.ok) throw new Error("خطا در دریافت آمار کاربران");
      return res.json();
    },
  });

  if (isLoading) return <p>در حال بارگذاری نمودار...</p>;
  if (isError || !data) return <p>خطا در بارگذاری نمودار</p>;

  const chartData = [
    { name: "ماه گذشته", value: data.lastMonth },
    { name: "این ماه", value: data.thisMonth },
  ];

  return (
    <div className="bg-white p-6 shadow rounded-xl w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">نمودار کاربران</h2>
      <PieChart width={330} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {chartData.map((item, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
