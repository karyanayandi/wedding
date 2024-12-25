"use client"

import { useInView } from "react-intersection-observer"

export function Videos() {
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
      <div className="grid gap-2">
        <video
          autoPlay
          muted
          loop
          className="h-full w-full rounded-lg object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
