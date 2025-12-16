"use client";

import { useQuery } from "@tanstack/react-query";
import UserPieChart from "../components/charts/UserPieChart";

export default function DashboardStats() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/users/stats"); // <-- مسیر درست
      if (!res.ok) throw new Error("خطا در دریافت اطلاعات داشبورد");
      return res.json();
    },
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError || !data)
    return <p className="text-red-500">خطا در بارگذاری داشبورد</p>;

  const { total, thisMonth, lastMonth, lastUser, latestUsers } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
      {/* کارت‌ها */}
      <div className="bg-white p-5 shadow rounded-xl">
        <p className="text-gray-500 text-sm">کل کاربران</p>
        <h2 className="text-3xl font-bold">{total}</h2>
      </div>

      <div className="bg-white p-5 shadow rounded-xl">
        <p className="text-gray-500 text-sm">کاربران این ماه</p>
        <h2 className="text-3xl font-bold text-blue-600">{thisMonth}</h2>
      </div>

      <div className="bg-white p-5 shadow rounded-xl">
        <p className="text-gray-500 text-sm">کاربران ماه قبل</p>
        <h2 className="text-3xl font-bold text-green-600">{lastMonth}</h2>
      </div>

      <div className="bg-white p-5 shadow rounded-xl">
        <p className="text-gray-500 text-sm">آخرین کاربر</p>
        <h2 className="text-lg font-bold">{lastUser?.name ?? "—"}</h2>
        <p className="text-gray-500 text-sm">{lastUser?.email}</p>
      </div>

      {/* نمودار */}
      <div className="md:col-span-4 mt-6">
        <UserPieChart data={{ thisMonth, lastMonth }} />
      </div>

      {/* آخرین کاربران */}
      <div className="bg-white p-6 rounded-xl shadow mt-6 md:col-span-4">
        <h3 className="text-lg font-bold mb-3">آخرین کاربران ثبت‌شده</h3>

        <ul className="space-y-2">
          {latestUsers.length === 0 ? (
            <p className="text-gray-500">کاربری ثبت نشده است</p>
          ) : (
            latestUsers.map((u: any) => (
              <li key={u.id} className="border-b pb-2">
                {u.name} - {u.email}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
