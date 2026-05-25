"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  MapPinIcon,
  DocumentTextIcon,
  BellIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <HomeIcon className="w-5 h-5" /> },
  { label: "Clients", href: "/admin/clients", icon: <UsersIcon className="w-5 h-5" /> },
  { label: "Assets / Sites", href: "/admin/assets", icon: <MapPinIcon className="w-5 h-5" /> },
  { label: "Contracts", href: "/admin/contracts", icon: <DocumentTextIcon className="w-5 h-5" /> },
  { label: "Invoices", href: "/admin/invoices", icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
  { label: "Inventory", href: "/admin/inventory", icon: <ArchiveBoxIcon className="w-5 h-5" /> },
  { label: "Enquiries", href: "/admin/enquiries", icon: <InboxIcon className="w-5 h-5" /> },
  { label: "Messages", href: "/admin/messages", icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
  { label: "Reminders", href: "/admin/reminders", icon: <BellIcon className="w-5 h-5" /> },
  { label: "Reports", href: "/admin/reports", icon: <ChartBarIcon className="w-5 h-5" /> },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <Cog6ToothIcon className="w-5 h-5" />,
    roles: ["SUPER_ADMIN"],
  },
];

interface AdminSidebarProps {
  role: UserRole;
}

export function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const visibleItems = navItems.filter((item) => !item.roles || item.roles.includes(role));

  return (
    <aside
      className={cn(
        "flex flex-col bg-brand-dark border-r border-white/10 transition-all duration-300 relative z-10",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 h-16">
        <div className="w-8 h-8 bg-brand-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm font-heading">SM</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm font-heading leading-none">Smart Media</p>
            <p className="text-blue-300 text-xs">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-thin">
        {visibleItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "sidebar-link",
                isActive ? "sidebar-link-active" : "sidebar-link-inactive",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="flex-1 text-sm truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && item.badge > 0 && (
                <span className="ml-auto bg-brand-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-white/10 p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
