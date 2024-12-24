import { NextResponse, type NextRequest } from "next/server"

import { env } from "@/env"
import { uploadVoiceNoteToR2 } from "@/lib/r2"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as Blob | null

    if (!file) {
      return NextResponse.json(
        { message: "File blob is required." },
        { status: 400 },
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    //@ts-expect-error - We are sure that file is not null
    const [fileName, fileType] = file.name.split(".")

    const allowedFileTypes = ["ogg", "mp3", "wav"]

    if (!allowedFileTypes.includes(fileType)) {
      return NextResponse.json(
        { message: "Invalid file type. Only audio files are allowed." },
        { status: 400 },
      )
    }

    const defaultFileType = "audio/ogg"

    await uploadVoiceNoteToR2({
      file: buffer,
      fileName: fileName,
      contentType: defaultFileType,
    })

    return NextResponse.json(
      {
        url: `https://${env.R2_DOMAIN}/${fileName}`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    )
  }
}
