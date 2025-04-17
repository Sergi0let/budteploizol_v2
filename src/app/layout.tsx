import { ShopingCartProvider } from "@/context/ShopingCartContext";
import {
  baseUrl,
  descriptionMetadata,
  keywordsMetadata,
  Thumbnail,
  titleMetadata,
} from "@/data/metadata";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter_24pt = localFont({
  src: [
    { path: "./fonts/Inter_24pt-Regular.woff2", weight: "400" },
    { path: "./fonts/Inter_24pt-Medium.woff2", weight: "500" },
    { path: "./fonts/Inter_24pt-SemiBold.woff2", weight: "600" },
    { path: "./fonts/Inter_24pt-Bold.woff2", weight: "700" },
    { path: "./fonts/Inter_24pt-Black.woff2", weight: "900" },
  ],
  variable: "--font-inter_24pt",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: titleMetadata.main,
    description: descriptionMetadata.main,
    keywords: keywordsMetadata.main,
    icons: {
      icon: "/favicon/favicon.ico",
      apple: "/favicon/apple-icon.png",
      shortcut: "/favicon/favicon.ico",
      other: [
        {
          rel: "mask-icon",
          url: "/favicon/mask-icon.svg",
          color: "#f2e9f2",
        },
      ],
    },
    manifest: "/favicon/manifest.json",
    openGraph: {
      title: titleMetadata.main,
      description: descriptionMetadata.main,
      url: baseUrl,
      images: [
        {
          url: Thumbnail,
          secureUrl: Thumbnail,
          width: 1200,
          height: 630,
          alt: "Preview image for Budteploizol",
        },
      ],
      type: "website",
      siteName: "БУДТЕПЛОІЗОЛ",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk-UA">
      <body
        className={`${inter_24pt.variable} flex min-h-screen flex-col antialiased`}
      >
        <ShopingCartProvider>{children}</ShopingCartProvider>
      </body>
    </html>
  );
}
