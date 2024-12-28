"use client"

import { useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"

import { PhotoDialog } from "@/components/photo-dialog"

const photos = [
  { src: "/photos/1.jpg", alt: "1" },
  { src: "/photos/2.jpg", alt: "2" },
  { src: "/photos/3.jpg", alt: "3" },
  { src: "/photos/4.jpg", alt: "4" },
  { src: "/photos/5.jpg", alt: "5" },
  { src: "/photos/6.jpg", alt: "6" },
  { src: "/photos/7.jpg", alt: "7" },
  { src: "/photos/8.jpg", alt: "8" },
  { src: "/photos/9.jpg", alt: "9" },
  { src: "/photos/10.jpg", alt: "10" },
  { src: "/photos/11.jpg", alt: "11" },
  { src: "/photos/12.jpg", alt: "12" },
  { src: "/photos/13.jpg", alt: "13" },
  { src: "/photos/14.jpg", alt: "14" },
  { src: "/photos/15.jpg", alt: "15" },
  { src: "/photos/16.jpg", alt: "16" },
  { src: "/photos/17.jpg", alt: "17" },
]

export function Photos() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  )

  const openModal = (index: number) => setSelectedImageIndex(index)
  const closeModal = () => setSelectedImageIndex(null)

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImageIndex === null) return
    const newIndex =
      (selectedImageIndex + (direction === "next" ? 1 : -1) + photos.length) %
      photos.length
    setSelectedImageIndex(newIndex)
  }

  const MAX_VISIBLE_PHOTOS = 8
  const additionalPhotos = photos.length - MAX_VISIBLE_PHOTOS

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
      <div className="grid grid-cols-3 gap-2">
        {photos.slice(0, MAX_VISIBLE_PHOTOS).map((photo, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => openModal(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={200}
              height={200}
              className="aspect-square h-auto w-full rounded-lg object-cover"
            />
          </div>
        ))}

        {additionalPhotos > 0 && (
          <div
            className="relative cursor-pointer"
            onClick={() => openModal(MAX_VISIBLE_PHOTOS)}
          >
            <Image
              src={photos[MAX_VISIBLE_PHOTOS]?.src!}
              alt={`+${additionalPhotos} more`}
              width={200}
              height={200}
              className="aspect-square h-auto w-full rounded-lg object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 text-lg font-bold text-white">
              +{additionalPhotos}
            </div>
          </div>
        )}
      </div>
      <PhotoDialog
        isOpen={selectedImageIndex !== null}
        onClose={closeModal}
        photos={photos}
        currentIndex={selectedImageIndex ?? 0}
        onNavigate={navigateImage}
      />
    </div>
  )
}
