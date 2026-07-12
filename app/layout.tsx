import type { Metadata } from "next";
import { Anton, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { Marquee } from "@/components/Marquee";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-tag",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "HypeLocker — Shoes & Eyewear",
  description:
    "HypeLocker: streetwear sneakers, boots, sunglasses & optical. Wear loud, move fast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased bg-hl-bg text-hl-ink`}
      >
        <CartProvider>
          <WishlistProvider>
            <Marquee />
            <SiteHeader />
            {children}
            <SiteFooter />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
