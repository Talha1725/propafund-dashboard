import type { Metadata } from "next";
import { creatoDisplay, romanica } from "@/lib/fonts";
import "./globals.css";
import Footer from "@/components/common/footer";

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
        className={`${creatoDisplay.variable} ${romanica.variable} bg-black text-white antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
