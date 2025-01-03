"use client"

import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"

function InvitaitonName() {
  const searchParams = useSearchParams()
  const nameValue = searchParams
    .get("name")
    ?.replace(/\+/g, " ")
    .replace(/"/g, "")

  return (
    <div className="justtify-center absolute bottom-8 flex flex-col items-center text-sm opacity-75">
      <span>for</span>
      <span className="font-semibold uppercase"> {nameValue}</span>
    </div>
  )
}

export default function InvitationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#128C7E] text-white">
      <div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image src="/love.svg" alt="Heart" width={150} height={150} />
          <h1 className="mb-2 text-center text-3xl font-bold lg:text-4xl">
            Yandi dan Shofa
          </h1>
          <h1 className="mb-2 text-center text-3xl font-bold lg:text-4xl">
            Jadi Nikah
          </h1>
          <div className="flex items-center text-sm">
            <Calendar className="mr-1 h-4 w-4" />
            <span>5 Januari 2025</span>
          </div>
          <Link href="/">
            <Button className="animate-bounce duration-2s">
              Buka Undangan
            </Button>
          </Link>
          <Suspense>
            <InvitaitonName />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
