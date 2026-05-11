import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TP Next.js",
  description: "Un projet vide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
