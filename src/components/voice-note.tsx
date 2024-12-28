"use client"

import { useEffect, useRef, useState } from "react"

export const VoiceNote = ({ url }: { url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

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

  const handlePlay = () => {
    pauseAllAudio()
    if (audioRef.current) {
      audioRef.current.play()
    }
    setIsPlaying(true)
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    playAudio()
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate)
    }

    return () => {
      if (audioRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
  }

  return (
    <div className="flex w-full max-w-md items-center space-x-2 rounded-xl bg-transparent py-2">
      <button
        onClick={() => {
          if (isPlaying) {
            handlePause()
          } else {
            handlePlay()
          }
        }}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path d="M6 6h2v12H6zM10 6h2v12h-2z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        controls
        className="hidden w-full flex-1"
        onPlay={handlePlay}
        onEnded={handleEnded}
        onPause={handlePause}
      >
        <source src={url} type="audio/webm" />
      </audio>
      <span className="text-sm text-gray-500">{formatTime(currentTime)}</span>
    </div>
  )
}
