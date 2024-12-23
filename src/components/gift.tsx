import { useState } from "react"
import { GiftIcon } from "lucide-react"

import { GiftDialog } from "./gift-dialog"

export function Gift() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-2 text-xl font-semibold">Hadiah</h2>
      <div className="flex items-start space-x-2">
        <GiftIcon className="mt-1 size-5 flex-shrink-0 text-[#25d366]" />
        <div>
          <p className="text-sm">
            Kamu bisa memberikan hadiah di lokasi atau melalu link berikut.
          </p>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="mt-2 inline-block underline"
          >
            Kirim Hadiah
          </button>
        </div>
      </div>
      <GiftDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  )
}
