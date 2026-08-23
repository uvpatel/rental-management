import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rental Flow",
  description: "Rental Flow is a web application that allows users to manage their rental properties and tenants. It provides features such as property listings, tenant management, rent collection, and maintenance tracking. The application is designed to streamline the rental process and improve communication between landlords and tenants.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased suppressHydrationWarning`}
     
    >
      <body className="min-h-full flex flex-col"> <TooltipProvider>{children}</TooltipProvider></body>
    </html>
  );
}
