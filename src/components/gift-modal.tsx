"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Copy } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface GiftModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GiftModal({ isOpen, onClose }: GiftModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 sm:max-w-[425px]">
        <DialogHeader className="bg-[#25d366] p-4 text-white">
          <DialogTitle>Gift the Bride & Groom</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          {/* Mandiri Card */}
          <div className="space-y-4 rounded-xl border border-[#e4e6eb] bg-[#f0f2f5] p-4">
            <div className="flex items-start justify-between">
              <span className="text-lg font-semibold text-black">Mandiri</span>
              <span className="text-sm text-gray-500">debit virtual</span>
            </div>
            <div
              className="cursor-pointer space-y-1"
              onClick={() => copyToClipboard("13000-2098-2875", "Mandiri")}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl text-black">
                  13000-1800-227
                </span>
                {copiedField === "mandiri" ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-gray-600">YANDI KARYANA</p>
            </div>
            <div className="flex justify-end">
              <span className="text-2xl font-bold text-[#1a1f71]">VISA</span>
            </div>
          </div>

          {/* Tokopedia Gift Card */}
          <div
            className="cursor-pointer space-y-4 rounded-xl border border-[#e4e6eb] bg-[#f0f2f5] p-4"
            onClick={() =>
              copyToClipboard(
                "https://www.tokopedia.com/gift/wedding",
                "tokopedia",
              )
            }
          >
            <Link
              href="https://www.tokopedia.com/search?q=hampers+nikahan+kado+wedding&source=universe&st=product&navsource=home&srp_component_id=02.02.01.02"
              target="_blank"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-[#25d366]">
                  GIFT TOKOPEDIA
                </span>
              </div>
              <p className="text-gray-600">Wedding GIFT</p>
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500">
            Click the card to copy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
