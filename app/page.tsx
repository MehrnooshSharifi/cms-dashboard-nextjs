"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">🧩 Dashboard CMS</h1>
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-[100px] h-10 flex justify-center items-center"
        >
          ورود به داشبورد
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.h2
          className="text-4xl font-bold mb-4 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          به سیستم مدیریت کاربران خوش آمدید 👋
        </motion.h2>
        <motion.p
          className="text-gray-600 max-w-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          این یک سیستم مدیریت کاربران است که شامل داشبورد، نمودار، جستجو،
          صفحه‌بندی، ورود/ثبت‌نام و مدیریت کامل CRUD می‌باشد.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/dashboard/users"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition h-10 flex items-center justify-center w-[100px] "
          >
            مدیریت کاربران
          </Link>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center w-[100px] justify-center h-10"
          >
            مشاهده داشبورد
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-4 text-center text-gray-500 text-sm border-t">
        ساخته شده برای نمونه پروژه ❤️ — Next.js + Prisma + TailwindCSS
      </footer>
    </div>
  );
}
