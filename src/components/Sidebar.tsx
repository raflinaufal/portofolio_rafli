"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTheme } from "@/hooks/useTheme";
import {
  Home,
  User,
  Folder,
  MessageCircle,
  Mail,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  BarChart3,
  Database,
  Plus,
  List,
} from "lucide-react";

// Navigation items for regular users
const userNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Chat Room", href: "/chat", icon: MessageCircle },
  { label: "Contact", href: "/contact", icon: Mail },
];

// Navigation items for admin
const adminNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Projects", href: "/dashboard/projects", icon: Folder },
  { label: "Messages", href: "/dashboard/messages", icon: MessageCircle },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const { data: session, status } = useSession();
  const { isDarkMode, toggle } = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [session]);

  const isLoggedIn = !!session;

  return (
    <aside className="w-[260px] bg-card border-r flex flex-col justify-between min-h-screen relative">
      {/* Toggle dark/light mode */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition"
        onClick={toggle}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <div>
        {/* Tampilkan profile card jika sudah login (role apapun) */}
        {isLoggedIn && (
          <Card className="m-4 p-4 flex flex-col items-center bg-transparent shadow-none border-none">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                <AvatarImage src={session?.user?.image || "/avatar.jpg"} alt="Profile" />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Badge
                variant={isAdmin ? "default" : "secondary"}
                className="absolute -bottom-2 right-0 text-xs px-2 py-0.5"
              >
                {isAdmin ? "Admin" : "User"}
              </Badge>
            </div>
            <div className="mt-4 text-lg font-bold text-center">
              {session?.user?.name || "Guest User"}
            </div>
            <div className="text-muted-foreground text-sm mb-2 text-center">
              {session?.user?.email || "@guest"}
            </div>
          </Card>
        )}
        {/* END profile card */}
        <hr className="my-4 border-muted" />
        <nav className="flex flex-col gap-1">
          {(isLoggedIn && isAdmin ? adminNavItems : userNavItems).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-6 py-2 hover:bg-muted rounded transition text-base"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <footer className="p-4 text-xs text-muted-foreground text-center">
        © 2025 with ❤️ by {session?.user?.name || "Portfolio"}
      </footer>
    </aside>
  );
} 