"use cliene"

import { useEffect, useRef, useState } from "react"
import { Mic, Send, Trash2, X } from "lucide-react"
import { useForm } from "react-hook-form"

import { uploadVoiceNoteAction } from "@/action/upload-voice-note"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { api } from "@/trpc/react"

interface FormValues {
  name: string
  content: string
  willAttend: string
  file: Blob | null
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
  const form = useForm<FormValues>()
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const pauseAllAudio = () => {
    const audioElements =
      document.querySelectorAll<HTMLAudioElement>("#background-audio")
    audioElements.forEach((audio) => {
      if (!audio.paused) {
        audio.pause()
      }
    })
  }

  const playAudio = () => {
    const audioElements =
      document.querySelectorAll<HTMLAudioElement>("#background-audio")
    audioElements.forEach((audio) => {
      audio.play()
    })
  }

  useEffect(() => {
    form.setValue("content", initialMessage)
  }, [initialMessage, form])

  const startRecording = async () => {
    try {
      pauseAllAudio()
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
        const blob = new Blob(chunks, { type: "audio/webm;codecs=opus" })
        setAudioBlob(blob)
        form.setValue("file", blob)
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

  const deleteRecording = () => {
    setAudioBlob(null)
    form.setValue("file", null)
  }

  const { mutate: createMessage } = api.message.create.useMutation({
    onSuccess: () => {
      form.reset()
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
        willAttend: values.willAttend,
      })
      form.reset()
    } else {
      const { data, error } = await uploadVoiceNoteAction(values.file)

      if (data) {
        createMessage({
          name: values.name,
          content: values.content,
          willAttend: values.willAttend,
          voiceNote: data.url,
        })
        form.reset()
      } else if (error) {
        console.log(error)
        toast({ variant: "destructive", description: "Something went wrong" })
      }
    }

    onClose()
    playAudio()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose()
        playAudio()
      }}
    >
      <DialogContent className="overflow-hidden bg-[#f0f2f5] p-0 sm:max-w-[425px]">
        <DialogHeader className="p-4 text-black">
          <DialogTitle>Send Message</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 p-4">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Nama harus diisi",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukan Nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              rules={{
                required: "Pesan harus diisi",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pesan</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Masukan Pesan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="willAttend"
              rules={{
                required: "Kehadiran harus diisi",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kehadiran</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kehadiran" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hadir">Akan Hadir</SelectItem>
                      <SelectItem value="tidak hadir">Tidak Hadir</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                <div className="flex items-center space-x-2">
                  <audio controls className="w-full max-w-md rounded">
                    <source
                      src={URL.createObjectURL(audioBlob)}
                      type="audio/webm"
                    />
                  </audio>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={deleteRecording}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#25d366]"
              onClick={form.handleSubmit(onSubmitMessage)}
            >
              <Send className="mr-2 h-4 w-4" /> Kirim Pesan
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
