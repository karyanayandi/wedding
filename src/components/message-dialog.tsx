import { useEffect, useRef, useState } from "react"
import { Mic, Send, X } from "lucide-react"
import { useForm } from "react-hook-form"

import { uploadVoiceNoteAction } from "@/action/upload-voice-note"
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
import { toast } from "@/hooks/use-toast"
import { api } from "@/trpc/react"

interface FormValues {
  name: string
  content: string
  file: Blob
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
    reset,
  } = useForm<FormValues>()
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    setValue("content", initialMessage)
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

  const { mutate: createMessage } = api.message.create.useMutation({
    onSuccess: () => {
      reset()
      toast({
        variant: "default",
        description: "Pesan berhasil dikirim!",
      })
    },
    onError: (error) => {
      const errorData = error?.data?.zodError?.fieldErrors

      if (errorData) {
        toast({
          variant: "destructive",
          description: "Gagal mengirim pesan",
        })
      }
    },
  })

  const onSubmitMessage = async (values: FormValues) => {
    if (!values.file) {
      createMessage({
        name: values.name,
        content: values.content,
      })
      reset()
    } else {
      const { data, error } = await uploadVoiceNoteAction(values.file)

      if (data) {
        createMessage({
          name: values.name,
          content: values.content,
          voiceNote: data,
        })
        reset()
      } else if (error) {
        console.log(error)
        toast({ variant: "destructive", description: "Something went wrong" })
      }
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-[#f0f2f5] p-0 sm:max-w-[425px]">
        <DialogHeader className="p-4 text-black">
          <DialogTitle>Send Message</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 p-4">
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
              <p className="text-sm text-pink-300">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="message" className="text-black">
              Message
            </Label>
            <Textarea
              id="content"
              {...register("content")}
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
            onClick={handleSubmit(onSubmitMessage)}
          >
            <Send className="mr-2 h-4 w-4" /> Kirim Pesan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
