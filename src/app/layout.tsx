import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { QueryProvider } from "../components/providers/QueryProvider"
import { AppProviders } from "../components/providers/AppProviders"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Shopper - Your Online Shopping Destination",
  description:
    "Modern e-commerce platform with great products and excellent service",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AppProviders>{children}</AppProviders>
        </QueryProvider>{" "}
      </body>
    </html>
  )
}
