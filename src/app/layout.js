import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Connect the Dots - A Fun Strategy Game",
  description: "Play Connect the Dots! Conquer territories by linking dots to gain points and jump the leaderboard. Fun and engaging for all ages!",
  keywords: [
    "Connect the Dots",
    "Strategy Games",
    "Puzzle Games",
    "Drawing Games",
    "Brain Training",
    "Educational Games",
    "Number Puzzles",
    "Fun Games",
    "Multiplayer Games",
  ],
  authors: [{ name: "Ashish Shetty", url: "http://127.0.0.1" }], // Change the URL before deployment
  creator: "Ashish Shetty",
  applicationName: "Connect the Dots",
  generator: "Next.js",
  openGraph: {
    title: "Connect the Dots - A Fun Strategy Game",
    description: "Conquer territories by linking dots to gain points and jump the leaderboard!",
    url: "http://127.0.0.1", // Change the URL before deployment
    siteName: "Connect the Dots Game",
    images: [
      {
        url: "/public/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Connect the Dots Game Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect the Dots - A Fun Strategy Game",
    description: "Join the fun! Connect dots and challenge your brain with engaging puzzles.",
    images: ["/public/images/og-image.png"],
    creator: "@yourTwitterHandle",
  },
  icons: {
    icon: "/public/favicon.ico",
    shortcut: "/public/favicon.ico",
    apple: "/public/apple-touch-icon.png",
  },
  manifest: "/public/site.webmanifest",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
