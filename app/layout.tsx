import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import  { Toaster } from 'react-hot-toast';
import Modalprovider from "@/components/providers/create-server-provider";

const font = Open_Sans({ subsets: ['latin'] })

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
          font.className,
          "bg-white dark:bg-[#313338] "
        )}>
          <ThemeProvider
            defaultTheme="dark"
            storageKey="discord theme"
            enableSystem={true}
            attribute="class"
          >
            {children}
            <Modalprovider/>
            <Toaster/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
