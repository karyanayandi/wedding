"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Heart, LockIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function InvitationPage() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name")?.replace(/\+/g, " ").replace(/"/g, "")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#128C7E] text-white">
      <div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Heart className="size-24" />
          <h1 className="mb-2 text-center text-3xl font-bold lg:text-4xl">
            Yandi dan Shofa Jadi Nikah
          </h1>
          <div className="flex items-center text-sm">
            <LockIcon className="mr-1 h-4 w-4" />
            <span>5 Januari 2025</span>
          </div>
          <Link href="/">
            <Button>Buka Undangan</Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 text-sm opacity-75">
        for
        <Suspense>
          <span className="font-semibold"> {name}</span>
        </Suspense>
      </div>
    </div>
  )
}
