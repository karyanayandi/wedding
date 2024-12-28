"use client"

const pauseAllAudio = () => {
  const audioElements =
    document.querySelectorAll<HTMLAudioElement>("#background-audio")
  audioElements.forEach((audio) => {
    if (!audio.paused) {
      audio.pause()
    }
  })
}

export const voiceNote = ({ voiceNoteUrl }: { voiceNoteUrl: string }) => {
  const handlePlay = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    pauseAllAudio()

    const audio = event.currentTarget
    audio.play()
  }

  return (
    <audio controls className="w-full max-w-md rounded" onPlay={handlePlay}>
      <source src={voiceNoteUrl} type="audio/webm" />
    </audio>
  )
}
