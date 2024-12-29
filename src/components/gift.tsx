"use client"

import { useState } from "react"
import { GiftIcon } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { GiftDialog } from "./gift-dialog"

export function Gift() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div
      ref={ref}
      className={`rounded-lg bg-white p-4 shadow duration-2s ${
        inView ? "animate-in slide-in-from-bottom" : "opacity-0"
      }`}
    >
      <h2 className="mb-2 text-xl font-semibold">Hadiah</h2>
      <div className="flex items-start space-x-2">
        <GiftIcon className="mt-1 size-5 flex-shrink-0 text-[#25d366]" />
        <div>
          <p className="text-sm">
            Kamu bisa memberikan hadiah di lokasi atau melalu link berikut.
          </p>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="mt-2 inline-block underline"
          >
            Kirim Hadiah
          </button>
        </div>
      </div>
      <GiftDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  )
}
