import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-900 text-white p-6">
        <Link href="/dashboard" className="block hover:text-gray-300">
          داشبورد
        </Link>

        <nav className="space-y-4">
          <Link href="/dashboard/users" className="block hover:text-gray-300">
            کاربران
          </Link>
          <Link href="/" className="block hover:text-gray-300">
            صفحه اصلی
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}
