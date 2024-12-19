import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  content: React.ReactNode | string
  sender: "couple" | "guest"
  timestamp: string
  type?: "text" | "section"
}

export function MessageBubble({
  content,
  sender,
  timestamp,
  type = "text",
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "mb-2 max-w-[70%] rounded-lg p-3",
        sender === "couple" ? "ml-auto bg-[#e7ffdb]" : "bg-white",
        type === "section" && "w-full max-w-full bg-transparent p-0",
      )}
    >
      {type === "text" ? <p className="text-sm">{content}</p> : content}
      {type === "text" && (
        <p className="mt-1 text-right text-[10px] text-gray-500">{timestamp}</p>
      )}
    </div>
  )
}
