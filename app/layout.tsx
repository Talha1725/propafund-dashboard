import type { Metadata } from "next";
import { creatoDisplay, romanica } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import JotaiProvider from "@/lib/providers/jotai-provider";
import AuthProvider from "@/lib/providers/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Propafund",
  description: "Propafund - Your trusted investment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${creatoDisplay.variable} ${romanica.variable} bg-black text-white overflow-x-hidden antialiased`}
      >
        <JotaiProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
