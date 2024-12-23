import "@/styles/globals.css"

import { type Metadata } from "next"

import { TRPCReactProvider } from "@/trpc/react"

export const metadata: Metadata = {
  title: "Jadi Nikah",
  description: "Yandi dan Shofa jadi nikah",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
