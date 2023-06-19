import "@/styles/globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Perf Test Next.js",
  description: "Perf Test Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <main className="flex min-h-screen flex-col bg-black p-2 text-gray-200">
          {children}
        </main>
      </body>
    </html>
  );
}
