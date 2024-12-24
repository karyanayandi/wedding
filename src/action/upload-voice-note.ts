export async function uploadVoiceNoteAction(data: Blob) {
  try {
    const formData = new FormData()
    formData.append("file", data)

    const response = await fetch("/api/upload-voice-note", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload voice note")
    }

    return await response.json()
  } catch (error) {
    console.error("Error uploading voice note:", error)
    throw error
  }
}
