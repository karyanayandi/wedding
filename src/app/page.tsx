"use client"

import { useState } from "react"

import { BrideAndGroom } from "@/components/bride-and-groom"
import { Gift } from "@/components/gift"
import { Header } from "@/components/header"
import { InputArea } from "@/components/input-area"
import { Location } from "@/components/location"
import { MessageModal } from "@/components/message-modal"
import { Messages } from "@/components/messages"
import { OurStory } from "@/components/our-story"
import { Photos } from "@/components/photos"
import { Videos } from "@/components/videos"

export default function WeddingWhatsApp() {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")

  const handleSendMessage = (message: string) => {
    setCurrentMessage(message)
    setIsMessageModalOpen(true)
  }

  return (
    <div className="main-pattern flex h-screen flex-col bg-[#efeae2] bg-[url('/bg.png')]">
      <Header />
      <main className="flex-grow overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-3 p-4">
          <BrideAndGroom />
          <OurStory />
          <Photos />
          <Videos />
          <Location />
          <Gift />
          <Messages />
        </div>
      </main>
      <InputArea onSendMessage={handleSendMessage} />
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        initialMessage={currentMessage}
      />
    </div>
  )
}
