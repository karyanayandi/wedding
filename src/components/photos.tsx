import { useState } from "react"
import Image from "next/image"

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

  const MAX_VISIBLE_PHOTOS = 5
  const additionalPhotos = photos.length - MAX_VISIBLE_PHOTOS

  return (
    <div className="rounded-lg bg-white p-4 shadow">
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
