import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <main className="flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  );
}
