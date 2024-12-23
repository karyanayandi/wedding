import { useState } from "react"
import { Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GiftDialog } from "./gift-dialog"

interface InputAreaProps {
  onSendMessage: (message: string) => void
}

export function InputArea({ onSendMessage }: InputAreaProps) {
  const [message, setMessage] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <>
      <div className="sticky bottom-0 z-10 flex items-center space-x-2 bg-[#f0f2f5] p-2">
        <button onClick={() => setIsDialogOpen(true)}>
          <Gift className="size-5" />
        </button>
        <Input
          className="flex-grow rounded-full bg-white px-4 py-2"
          placeholder="Tulis pesan untuk calon pengantin..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          size="icon"
          className="size-8 rounded-full bg-[#25d366] px-4 hover:bg-[#25d366]"
          onClick={handleSend}
        >
          <svg
            className="size-5 text-white"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 24 24"
          >
            <title>send</title>
            <path
              fill="currentColor"
              d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
            ></path>
          </svg>
        </Button>
      </div>
      <GiftDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  )
}
