"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
  };
}

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  MANAGER: "Manager",
  VIEWER: "Viewer",
};

const roleColors: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-100 text-purple-700",
  MANAGER: "bg-blue-100 text-blue-700",
  VIEWER: "bg-gray-100 text-gray-600",
};

export function AdminHeader({ user }: AdminHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      {/* Breadcrumb area */}
      <div>
        <p className="text-xs text-gray-400">Smart Media Nepal</p>
        <p className="text-sm font-semibold text-gray-800">Admin Panel</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link
          href="/admin/reminders"
          className="relative p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red-500 rounded-full" />
        </Link>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-brand-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user.name?.charAt(0).toUpperCase() ?? "A"}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 leading-none">{user.name}</p>
              <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", roleColors[user.role])}>
                {roleLabels[user.role] ?? user.role}
              </span>
            </div>
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Cog6ToothIcon className="w-4 h-4 text-gray-400" />
                  Settings
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
