"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useSidebar } from "@/hooks/useSidebar";
import { toggleTheme } from "@/lib/slices/themeSlice";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  X,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
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
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, setActiveItem, toggleCollapsed, setMobileOpen } = useSidebar();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (session?.user && 'role' in session.user && session.user.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [session]);

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname, setActiveItem]);

  const isLoggedIn = !!session;
  const navItems = isLoggedIn && isAdmin ? adminNavItems : userNavItems;

  const userImage = session?.user?.image || "/avatar.jpg";
  const userName = session?.user?.name || "Rafli Naufal Alief";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className={cn(
          "flex items-center gap-2 transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <Avatar className="w-8 h-8">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <span className="font-semibold text-lg">{userName}</span>
          )}
        </div>
        
        {/* Desktop collapse button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapsed}
          className="hidden lg:flex"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

     

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-2">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleTheme())}
            className={cn(
              "gap-2",
              isCollapsed && "justify-center px-2"
            )}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!isCollapsed && <span>Theme</span>}
          </Button>
        </div>
        
        {!isCollapsed && (
          <div className="mt-4 text-xs text-muted-foreground text-center">
            © 2025 with ❤️ by {session?.user?.name || "Portfolio"}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col bg-card border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={(open: boolean) => setMobileOpen(open)}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
} 