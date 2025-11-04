import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import AnimatePresenceWrapper from "../components/animations/AnimatePresenceWrapper";
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
      >
        <AnimatePresenceWrapper>
          {children}
        </AnimatePresenceWrapper>
      </body>
    </html>
  );
}
