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

interface GiftDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function GiftDialog({ isOpen, onClose }: GiftDialogProps) {
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
        <DialogHeader className="p-4">
          <DialogTitle>Gift the Bride & Groom</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          {/* Mandiri Card */}
          <div className="space-y-4 rounded-xl border border-[#e4e6eb] bg-[#f0f2f5] p-4">
            <div className="flex items-start justify-between">
              <span className="text-lg font-semibold text-black">Mandiri</span>
            </div>
            <div
              className="cursor-pointer space-y-1"
              onClick={() => copyToClipboard("1300018000227", "mandiri")}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl text-black">
                  1300018000227
                </span>
                {copiedField === "mandiri" ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-gray-600">YANDI KARYANA</p>
            </div>
          </div>
          {/* BSI Card */}
          <div className="space-y-4 rounded-xl border border-[#e4e6eb] bg-[#f0f2f5] p-4">
            <div className="flex items-start justify-between">
              <span className="text-lg font-semibold text-black">BSI</span>
            </div>
            <div
              className="cursor-pointer space-y-1"
              onClick={() => copyToClipboard("1211600274", "bsi")}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl text-black">1211600274</span>
                {copiedField === "bsi" ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-gray-600">SHOFA SAHADATU ROHMAH</p>
            </div>
          </div>
          {/* Tokopedia Gift Card */}
          <div className="cursor-pointer space-y-4 rounded-xl border border-[#e4e6eb] bg-[#f0f2f5] p-4">
            <Link
              href="https://www.tokopedia.com/search?q=hampers+nikahan+kado+wedding&source=universe&st=product&navsource=home"
              target="_blank"
            >
              <div className="flex h-[100px] w-full flex-col justify-between">
                <div className="flex w-full justify-end">
                  <span className="text-lg font-semibold text-[#25d366]">
                    GIFT TOKOPEDIA
                  </span>
                </div>
                <div className="flex w-full items-end justify-between">
                  <p className="text-gray-600">Wedding GIFT</p>
                </div>
              </div>
            </Link>
          </div>
          {/* Shopee Gift Card */}
          <div className="cursor-pointer space-y-4 rounded-xl border border-[#e4e6eb] bg-[#f0f2f5] p-4">
            <Link
              href="https://shopee.co.id/search?keyword=hampers%20pernikahan"
              target="_blank"
            >
              <div className="flex h-[100px] w-full flex-col justify-between">
                <div className="flex w-full justify-end">
                  <span className="text-lg font-semibold text-[#FD5C32]">
                    GIFT SHOPEE
                  </span>
                </div>
                <div className="flex w-full items-end justify-between">
                  <p className="text-gray-600">Wedding GIFT</p>
                </div>
              </div>
            </Link>
          </div>
          <p className="text-center text-lg font-semibold">
            Klik untuk menyalin nomor atau url
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
