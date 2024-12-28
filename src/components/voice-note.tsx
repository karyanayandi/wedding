"use client"

export const VoiceNote = ({ url }: { url: string }) => {
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
  }

  const handleEnded = () => {
    playAudio()
  }

  const handlePause = () => {
    playAudio()
  }

  return (
    <audio
      controls
      className="w-full max-w-md rounded"
      onPlay={handlePlay}
      onEnded={handleEnded}
      onPause={handlePause}
    >
      <source src={url} type="audio/webm" />
    </audio>
  )
}
