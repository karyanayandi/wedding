"use client"

import { useInView } from "react-intersection-observer"

export function OurStory() {
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
      <p className="text-sm">
        Yandi dan Shofa pertama kali bertemu di MA Alif Al-Ittifaq pada 2014 dan
        menjalani hubugan jarak jauh pada 2015 karena Shofa pindah sekolah. Pada
        2021, Yandi mengunjungi rumah Shofa untuk menyampaikan niat baiknya,
        tetapi rencana tersebut ditunda hingga Shofa menyelesaikan kuliah.
        Insyaallah, mereka akan melangsungkan pernikahan pada 5 Januari 2025,
        berharap menjadi keluarga sakinah, mawaddah, dan warahmah.
      </p>
    </div>
  )
}
