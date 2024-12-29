"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"

export default function Home() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")

  const handleGenerate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newLink = `${window.location.origin}/invite?name=${encodeURIComponent(name)}`
    setGeneratedLink(newLink)

    const newMessage = `Yth. ${name}
Assalamualaikum Wr. Wb

Dengan memohon Rahmat Dan Ridho Allah SWT, Dan tanpa mengurangi rasa hormat kami. melalui media sosial ini, kami Yandi & Shofa mengundang Bapak/Ibu/Sdr/i untuk berkenan hadir di acara pernikahan kami.

Detail Acara:

${newLink}

Merupakan suatu kehormatan dan kebahagiaan jika Anda bersedia hadir dan turut memberikan doa restu untuk kami

Terimakasih kami sampaikan Bapak/Ibu/Sdr/i.

Wassalamualaikum Wr.Wb
Yandi & Shofa`

    setMessage(newMessage)
  }

  const sendWhatsAppMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Message Empty",
        description: "Please enter a message before sending.",
        variant: "destructive",
      })
      return
    }

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const copyToClipboardLink = () => {
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => {
        toast({
          title: "Link Copied!",
          description: "The link has been copied to your clipboard.",
        })
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Failed to copy link to clipboard.",
          variant: "destructive",
        })
      })
  }

  const copyToClipboardMessage = () => {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        toast({
          title: "Message Copied!",
          description: "The message has been copied to your clipboard.",
        })
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Failed to copy message to clipboard.",
          variant: "destructive",
        })
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Generate Invitation Link
        </h1>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Enter Name
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name for splash screen"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Generate
          </Button>
        </form>
        {generatedLink && (
          <div className="mt-4 space-y-2">
            <div className="flex space-x-2">
              <Input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-grow bg-gray-50"
              />
              <Button onClick={copyToClipboardLink} className="shrink-0">
                Copy
              </Button>
            </div>
            <div className="flex space-x-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow bg-gray-50"
              />
              <Button onClick={copyToClipboardMessage} className="shrink-0">
                Copy
              </Button>
            </div>
            <Button
              onClick={sendWhatsAppMessage}
              className="w-full bg-green-500 text-white hover:bg-green-600"
            >
              Send to WhatsApp
            </Button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  )
}
