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
  onNavigate: (direction: "next" | "prev") => void
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
      <DialogContent className="h-auto max-w-[90vw] p-0">
        <DialogTitle className="hidden">Photos</DialogTitle>
        <div className="relative h-auto max-w-[90vw] object-cover">
          <Image
            src={currentPhoto?.src!}
            alt={currentPhoto?.alt!}
            layout="intrinsic"
            width={currentPhoto?.src.endsWith(".portrait.jpg") ? 1080 : 1920}
            height={currentPhoto?.src.endsWith(".portrait.jpg") ? 1920 : 1080}
            objectFit="contain"
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
