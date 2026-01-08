import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WorkBridge E-Labour",
  description: "Networking and on-demand labour bookings",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
