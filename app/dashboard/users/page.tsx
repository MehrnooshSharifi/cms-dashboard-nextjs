"use client";

import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import ConfirmModal from "@/app/components/ConfirmModal";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

async function fetchUsers(params: {
  page: number;
  limit: number;
  q?: string;
  sort?: string;
}) {
  const { page, limit, q, sort } = params;
  let url = `/api/users?page=${page}&limit=${limit}`;
  if (q) url += `&q=${encodeURIComponent(q)}`;
  if (sort) url += `&sort=${encodeURIComponent(sort)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("خطا در دریافت کاربران");
  return res.json(); // { data, total, page, limit }
}

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q, 400);
  const [sort, setSort] = useState<"id" | "name">("id");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["users", page, debouncedQ, sort],
    queryFn: () => fetchUsers({ page, limit, q: debouncedQ, sort }),
    keepPreviousData: true,
    staleTime: 1000 * 30,
  });

  const total = data?.total ?? 0;
  const users = data?.data ?? [];
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );
  const queryClient = useQueryClient();
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("خطا در حذف کاربر");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowModal(false);
    },
  });
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="جستجو بر اساس نام یا ایمیل..."
            className="p-2 border border-gray-300 rounded-md md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as any);
              setPage(1);
            }}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="id">مرتب‌سازی: شناسه</option>
            <option value="name">مرتب‌سازی: نام</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          {isFetching
            ? "در حال بروزرسانی..."
            : `نمایش ${users.length} از ${total} کاربر`}
        </div>
        <Link
          href="/dashboard/users/create"
          className="p-4 border border-gray-300 flex justify-center items-center  bg-green-600 text-white py-2 rounded-md transition"
        >
          ایجاد کاربر جدید
        </Link>
      </div>

      {isLoading ? (
        <p>در حال بارگذاری...</p>
      ) : isError ? (
        <p className="text-red-500">خطا در بارگذاری کاربران.</p>
      ) : (
        <>
          <div className="overflow-x-auto border border-gray-300 rounded-lg">
            <table className="w-full text-right border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b text-left">شناسه</th>
                  <th className="p-3 border-b text-left">نام</th>
                  <th className="p-3 border-b text-left">ایمیل</th>
                  <th className="p-3 border-b text-left">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: User) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{u.id}</td>
                    <td className="p-3 border-b">{u.name}</td>
                    <td className="p-3 border-b">{u.email}</td>
                    <td className="p-3 border-b">
                      <a
                        className="text-blue-600 hover:underline mx-2"
                        href={`/dashboard/users/${u.id}/edit`}
                      >
                        ویرایش
                      </a>
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setShowModal(true);
                        }}
                        className="text-red-600 mx-2  cursor-pointer"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 ml-2"
              >
                قبلی
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
              >
                بعدی
              </button>
            </div>

            <div className="text-sm text-gray-600">
              صفحه {page} از {totalPages}
            </div>
          </div>
        </>
      )}
      <ConfirmModal
        open={showModal}
        title="حذف کاربر"
        message={`آیا از حذف "${selectedUser?.name}" مطمئن هستید؟`}
        confirmText="حذف"
        cancelText="لغو"
        loading={deleteUserMutation.isPending}
        onCancel={() => setShowModal(false)}
        onConfirm={() => deleteUserMutation.mutate(selectedUser.id)}
      />
    </div>
  );
}
