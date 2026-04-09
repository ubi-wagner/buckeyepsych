import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buckeye Psychiatry, LLC — Adam Brandemihl, M.D.",
  description:
    "Board-certified psychiatric care in Dublin, Ohio. Psychiatric assessment, medication management, and psychotherapy for adults and late-teen adolescents.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  openGraph: {
    type: "website",
    title: "Buckeye Psychiatry, LLC",
    description:
      "Board-certified psychiatric care in Dublin, Ohio. New patient appointments typically available within 1–2 weeks.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-cream text-ink antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
