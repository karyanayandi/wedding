"use client"

import Image from "next/image"
import { DialogTitle } from "@radix-ui/react-dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Dialog, DialogContent } from "@/components/ui/dialog"

interface PhotoDialogProps {
  isOpen: boolean
  onClose: () => void
  photos: { src: string; alt: string }[]
  currentIndex: number
  onNavigate: (_direction: "next" | "prev") => void
}

export function PhotoDialog({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onNavigate,
}: PhotoDialogProps) {
  const currentPhoto = photos[currentIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-auto w-full p-0 lg:max-w-[512px]">
        <DialogTitle className="hidden">Photos</DialogTitle>
        <div className="relative h-auto object-cover lg:max-w-[512px]">
          <Image
            src={currentPhoto?.src!}
            alt={currentPhoto?.alt!}
            layout="intrinsic"
            width={600}
            height={600}
            className="rounded-lg"
          />
          <button
            onClick={() => onNavigate("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity hover:bg-opacity-75"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => onNavigate("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity hover:bg-opacity-75"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
