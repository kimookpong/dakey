import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RahatLab - Server Manager",
  description: "Secure server credential and domain management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
