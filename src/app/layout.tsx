import "@/styles/globals.css"

import { type Metadata } from "next"

import { TRPCReactProvider } from "@/trpc/react"

export const metadata: Metadata = {
  title: "Yandi dan Shofa jadi nikah",
  description: "Minggu, 5 Januari 2025",
  icons: [{ rel: "icon", url: "/icon/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex h-auto w-full items-center justify-center">
        <section className="w-full lg:max-w-[512px]">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </section>
      </body>
    </html>
  )
}
