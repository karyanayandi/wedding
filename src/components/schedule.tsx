"use client"

import { Calendar } from "lucide-react"
import { useInView } from "react-intersection-observer"

export function Schedule() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  return (
    <div
      ref={ref}
      className={`rounded-lg bg-white p-4 shadow duration-1000 ${
        inView ? "animate-in slide-in-from-bottom" : "opacity-0"
      }`}
    >
      <h2 className="mb-4 text-xl font-semibold">Acara</h2>
      <div className="flex items-start space-x-2">
        <Calendar className="mt-1 size-5 flex-shrink-0 text-[#25d366]" />
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-bold">Akad Nikah</p>
            <p className="text-sm">Minggu, 5 Januari 2025</p>
            <p className="text-sm">08:00 - 10:00 WIB</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold">Resepsi</p>
            <p className="text-sm">Minggu, 5 Januari</p>
            <p className="text-sm">11:00 - 16:00 WIB</p>
          </div>
        </div>
      </div>
    </div>
  )
}
