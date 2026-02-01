import type { Metadata } from "next";
import { Inter, Space_Grotesk, Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coach Voice",
  description: "Coach Voice helps you slow down, listen back, and understand what truly happens in your sessions.",
  openGraph: {
    title: "Coach Voice",
    description: "Coach Voice helps you slow down, listen back, and understand what truly happens in your sessions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${caveat.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
