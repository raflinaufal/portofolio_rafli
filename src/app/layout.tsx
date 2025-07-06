import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio - Personal Website",
  description: "Personal portfolio website with dynamic content management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        <ReduxProvider>
          <ThemeProvider>
            <SessionProvider>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <MobileHeader />
                  <main className="flex-1 relative overflow-x-hidden">
                    {/* Grid background */}
                    <div className="absolute inset-0 -z-10 bg-dot-grid opacity-40" />
                    <div className="relative p-8">{children}</div>
                  </main>
                </div>
              </div>
              <Toaster />
            </SessionProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
