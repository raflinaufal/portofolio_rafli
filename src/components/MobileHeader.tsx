"use client";

import { useSidebar } from "@/hooks/useSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function MobileHeader() {
  const { toggleMobileOpen, isMobileOpen } = useSidebar();
  const { data: session } = useSession();
  const userImage = session?.user?.image || "/avatar.jpg";
  const userName = session?.user?.name || "Portfolio";

  if (isMobileOpen) return null;

  return (
    <header className="lg:hidden flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={userImage} alt={userName} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-lg">{userName}</span>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMobileOpen}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </header>
  );
} 