"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const userSchema = z.object({
  name: z.string().min(3, "نام باید حداقل 3 کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
});

type UserFormData = z.infer<typeof userSchema>;

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  // دریافت اطلاعات کاربر
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات کاربر");

        const data = await res.json();
        setValue("name", data.name);
        setValue("email", data.email);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId, setValue]);

  // Mutation برای ذخیره تغییرات
  const updateUser = useMutation({
    mutationFn: async (data: UserFormData) => {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("خطا در ویرایش کاربر");
      return res.json();
    },
    onSuccess: () => {
      router.push("/dashboard/users");
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const onSubmit = (data: UserFormData) => {
    setError("");
    updateUser.mutate(data);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">در حال بارگذاری...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-3">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">ویرایش کاربر</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">نام</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ایمیل</label>
            <input
              type="email"
              {...register("email")}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </form>
      </div>
    </div>
  );
}
