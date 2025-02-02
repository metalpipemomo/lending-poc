import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lendr",
  description: "Hook up with other Lendrs today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
