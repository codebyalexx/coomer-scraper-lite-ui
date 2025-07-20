import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtreeSans = Figtree({
  variable: "--font-figtree-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coomer Scraper Lite UI",
  description: "UI for coomer-scraper-lite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtreeSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
