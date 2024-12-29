"use client"

import { useState } from "react"

import { BrideAndGroom } from "@/components/bride-and-groom"
import { Gift } from "@/components/gift"
import { Header } from "@/components/header"
import { InputArea } from "@/components/input-area"
import { Location } from "@/components/location"
import { MessageDialog } from "@/components/message-dialog"
import { Messages } from "@/components/messages"
import { OurStory } from "@/components/our-story"
import { Photos } from "@/components/photos"
import { Quran } from "@/components/quran"
import { Schedule } from "@/components/schedule"
import { Videos } from "@/components/videos"

export default function WeddingWhatsApp() {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")

  const handleSendMessage = (message: string) => {
    setCurrentMessage(message)
    setIsMessageDialogOpen(true)
  }

  return (
    <div className="main-pattern flex h-screen flex-col bg-[#efeae2] bg-[url('/bg.png')]">
      <Header />
      <main className="flex-grow overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-3 p-4">
          <Quran />
          <BrideAndGroom />
          <OurStory />
          <Photos />
          <Videos />
          <Schedule />
          <Location />
          <Gift />
          <Messages />
        </div>
      </main>
      <InputArea onSendMessage={handleSendMessage} />
      <MessageDialog
        isOpen={isMessageDialogOpen}
        onClose={() => setIsMessageDialogOpen(false)}
        initialMessage={currentMessage}
      />
    </div>
  )
}
