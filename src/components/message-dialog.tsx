import { useEffect, useRef, useState } from "react"
import { Mic, Send, X } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MessageFormData {
  name: string
  message: string
}

export function MessageDialog({
  isOpen,
  onClose,
  initialMessage,
}: {
  isOpen: boolean
  onClose: () => void
  initialMessage: string
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MessageFormData>()
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    setValue("message", initialMessage)
  }, [initialMessage, setValue])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
        setAudioBlob(blob)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const onSubmit = (data: MessageFormData) => {
    // Here you would typically send the form data and audio blob to your server
    console.log(data, audioBlob)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-[#f0f2f5] p-0 sm:max-w-[425px]">
        <DialogHeader className="p-4 text-black">
          <DialogTitle>Send Message</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div>
            <Label htmlFor="name" className="text-black">
              Name
            </Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="bg-white"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="message" className="text-black">
              Message
            </Label>
            <Textarea
              id="message"
              {...register("message")}
              className="bg-white"
            />
          </div>
          <div className="flex items-center justify-between">
            {!isRecording && !audioBlob && (
              <Button
                type="button"
                variant="outline"
                onClick={startRecording}
                className="bg-white"
              >
                <Mic className="mr-2 h-4 w-4" /> Voice Note
              </Button>
            )}
            {isRecording && (
              <Button
                type="button"
                variant="destructive"
                onClick={stopRecording}
              >
                <X className="mr-2 h-4 w-4" /> Stop Recording
              </Button>
            )}
            {audioBlob && (
              <audio
                controls
                src={URL.createObjectURL(audioBlob)}
                className="w-full"
              />
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-[#25d366] hover:bg-[#006e5a]"
          >
            <Send className="mr-2 h-4 w-4" /> Kirim Pesan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
