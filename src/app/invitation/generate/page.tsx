"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"

export default function Home() {
  const [name, setName] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      const encodedName = encodeURIComponent(name.trim())
      const link = `${window.location.origin}/invitation?name=${encodedName}`
      setGeneratedLink(link)
    }
  }

  const copyToClipboard = () => {
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Generate Invitied Guest Link
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
          <div className="mt-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-grow bg-gray-50"
              />
              <Button onClick={copyToClipboard} className="shrink-0">
                Copy
              </Button>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  )
}
