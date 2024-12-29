"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"
import { useInView } from "react-intersection-observer"

export function Location() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const mapUrl = "https://maps.app.goo.gl/YsLEEbL1U9CB8hQU7"

  return (
    <div
      ref={ref}
      className={`rounded-lg bg-white p-4 shadow duration-2s ${
        inView ? "animate-in slide-in-from-bottom" : "opacity-0"
      }`}
    >
      <h2 className="mb-2 text-xl font-semibold">Lokasi</h2>
      <div className="flex items-start space-x-2">
        <MapPin className="mt-1 size-5 flex-shrink-0 text-[#25d366]" />
        <div>
          <p className="font-medium">Ponpes Ummul Hasanah</p>
          <p className="text-sm">Margaasih, Kab. Bandung</p>
          <Link
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block underline"
          >
            Buka di Google Maps
          </Link>
        </div>
      </div>
    </div>
  )
}
