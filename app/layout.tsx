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
        <div style={{ position: "fixed", top: "15%", right: "25%", width: "40px", height: "40px", background: "#f97316", borderRadius: "50%", filter: "blur(20px)", opacity: 0.4, pointerEvents: "none", zIndex: -1 }} />
        <div style={{ position: "fixed", bottom: "35%", left: "15%", width: "30px", height: "30px", background: "#8b5cf6", borderRadius: "50%", filter: "blur(15px)", opacity: 0.4, pointerEvents: "none", zIndex: -1 }} />

        {children}
      </body>
    </html>
  );
}
