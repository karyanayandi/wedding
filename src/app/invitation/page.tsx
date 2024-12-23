"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { LockIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

function InvitaitonName() {
  const searchParams = useSearchParams()
  const nameValue = searchParams
    .get("name")
    ?.replace(/\+/g, " ")
    .replace(/"/g, "")

  return (
    <div className="absolute bottom-8 text-sm opacity-75">
      for
      <span className="font-semibold uppercase"> {nameValue}</span>
    </div>
  )
}

export default function InvitationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#128C7E] text-white">
      <div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-8xl text-red-500">&hearts;</div>
          <h1 className="mb-2 text-center text-3xl font-bold lg:text-4xl">
            Yandi dan Shofa
          </h1>
          <h1 className="mb-2 text-center text-3xl font-bold lg:text-4xl">
            Jadi Nikah
          </h1>
          <div className="flex items-center text-sm">
            <LockIcon className="mr-1 h-4 w-4" />
            <span>5 Januari 2025</span>
          </div>
          <Link href="/">
            <Button>Buka Undangan</Button>
          </Link>
          <Suspense>
            <InvitaitonName />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
