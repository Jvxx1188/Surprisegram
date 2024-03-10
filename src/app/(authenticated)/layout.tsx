import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Posts Recentes | Surprisegram",
  description: "no description",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="../ico.png" sizes="any" />
      <body
        className={
          inter.className +
          " flex flex-col h-screen bg-gradient-to-b from-violet-950 to-violet-800 bg-cover bg-fixed"
        }
      >
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
