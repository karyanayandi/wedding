export async function uploadVoiceNoteAction(data: Blob) {
  try {
    const formData = new FormData()
    formData.append("file", data)

    const response = await fetch("/api/voice-note", {
      method: "POST",
      body: formData,
    })

    if (response.status === 200) {
      const uploadedVoiceNote = await response.json()
      return { data: uploadedVoiceNote, error: null }
    } else {
      console.error("Upload failed")
      return { data: null, error: response }
    }
  } catch (error) {
    console.error("Error uploading voice note:", error)
    throw error
  }
}
