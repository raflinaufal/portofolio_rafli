import { SessionProvider } from "@/components/providers/SessionProvider";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <SessionProvider>
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
        </SessionProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
} 