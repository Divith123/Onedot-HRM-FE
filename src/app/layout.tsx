import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import AnimatePresenceWrapper from "../components/animations/AnimatePresenceWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
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
    apple: "/onedot-large.svg",
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
        <AuthProvider>
          <AnimatePresenceWrapper>
            {children}
          </AnimatePresenceWrapper>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
