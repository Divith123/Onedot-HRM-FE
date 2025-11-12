import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import AnimatePresenceWrapper from "../components/animations/AnimatePresenceWrapper";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ONEDOT HRM",
  description: "Developed by OneDot",
  icons: {
    icon: [
      {
        url: "/onedot.png",
        sizes: "any",
        type: "image/png",
      },
      {
        url: "/onedot.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    apple: "/onedot.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <AuthProvider>
            <ToastProvider>
              <AnimatePresenceWrapper>
                {children}
              </AnimatePresenceWrapper>
            </ToastProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
