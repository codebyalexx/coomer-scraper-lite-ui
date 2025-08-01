import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtreeSans.variable} antialiased dark min-h-screen bg-background`}
      >
        <Header />
        <div className="bg-background h-full">{children}</div>
        {modal}
      </body>
    </html>
  );
}
