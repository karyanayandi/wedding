import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Volume2, VolumeX } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Header() {
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setAudioPlaying(true)
    return () => setAudioPlaying(false)
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-2 border-b-border bg-white p-2 text-[#54656f] lg:border-l-border lg:border-r-border">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/us/couple.jpg"
              alt="Couple"
              className="aspect-square object-cover"
            />
            <AvatarFallback className="text-[#54656f]">Y&S</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href="/">
            <h1 className="text-base font-semibold text-black lg:text-lg">
              Jadi Nikah
            </h1>
          </Link>
          <p className="text-xs opacity-80">Minggu, 5 Januari, 2025</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {audioPlaying && (
          <audio ref={audioRef} loop id="background-audio" autoPlay>
            <source src="/music.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}
        <Button
          onClick={toggleMute}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-transparent hover:text-gray-200"
        >
          {isMuted ? (
            <VolumeX className="text-[#54656f]" size={20} />
          ) : (
            <Volume2 className="text-[#54656f]" size={20} />
          )}
        </Button>
      </div>
    </header>
  )
}
