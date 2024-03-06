import Modalprovider from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

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
        <body className={cn(font.className, "bg-white dark:bg-[#313338] ")}>
          <ThemeProvider
            defaultTheme="dark"
            storageKey="discord theme"
            enableSystem={true}
            attribute="class"
          >
            <SocketProvider>
              <QueryProvider>{children}</QueryProvider>
              <Modalprovider />
              <Toaster />
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
