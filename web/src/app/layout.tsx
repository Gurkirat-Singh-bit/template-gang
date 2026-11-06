import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jetbrains = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  variable: "--font-jetbrains",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  title: "Warehouse — Your building blocks",
  description:
    "Your personal collection of components, templates, and resources. Organized by your folders, ready for your next project.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
