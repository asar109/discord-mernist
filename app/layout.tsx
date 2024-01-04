import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "a-discord",
  description: "a discord clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          inter.className,
          "bg-white dark:bg-[#313338] "
        )}>
          <ThemeProvider
            defaultTheme="dark"
            storageKey="discord theme"
            enableSystem={true}
            attribute="class"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
