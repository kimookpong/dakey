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
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body>
        {/* Floating Animated Spheres (shared background) */}
        <div className="sphere sphere-purple" />
        <div className="sphere sphere-orange" />
        {/* Center glass plate with colored blurred circles (site-wide decorative background) */}
        <div className="glass-plate" aria-hidden>
          <div className="plate-circle plate-circle-1" />
          <div className="plate-circle plate-circle-2" />
          <div className="plate-circle plate-circle-3" />
          <div className="plate-circle plate-circle-4" />
          <div className="plate-circle plate-circle-5" />
        </div>
        {/* Small accent spheres */}
        <div className="sphere" style={{ top: "10%", right: "30%", width: "60px", height: "60px", background: "#f97316", opacity: 0.3, animation: "float-mid 18s infinite ease-in-out" }} />
        <div className="sphere" style={{ bottom: "35%", left: "15%", width: "80px", height: "80px", background: "#8b5cf6", opacity: 0.3, animation: "float-diagonal 22s infinite alternate ease-in-out" }} />
        <div className="sphere" style={{ top: "40%", left: "10%", width: "40px", height: "40px", background: "#10b981", opacity: 0.2, animation: "float-orbital 12s infinite linear" }} />
        <div className="sphere" style={{ bottom: "15%", right: "20%", width: "50px", height: "50px", background: "#06b6d4", opacity: 0.2, animation: "pulse-subtle 10s infinite ease-in-out" }} />

        {children}
      </body>
    </html>
  );
}
