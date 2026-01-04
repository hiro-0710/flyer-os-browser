// src/app/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flyer OS (browser-only minimal)",
  description: "Flyer OS core running entirely in the browser."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
