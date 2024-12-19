import { useState } from "react"

import { Button } from "@/components/ui/button"

interface Message {
  id: number
  name: string
  message: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: 10,
    name: "Alice",
    message: "Congratulations! Can't wait to celebrate with you!",
    timestamp: "2023-06-10 14:30",
  },
  {
    id: 9,
    name: "Bob",
    message: "So happy for you both. See you at the wedding!",
    timestamp: "2023-06-09 11:15",
  },
  {
    id: 8,
    name: "Charlie",
    message: "Wishing you a lifetime of love and happiness!",
    timestamp: "2023-06-08 09:45",
  },
  {
    id: 7,
    name: "Diana",
    message: "What a beautiful couple! Excited for the big day!",
    timestamp: "2023-06-07 16:20",
  },
  {
    id: 6,
    name: "Ethan",
    message: "Congratulations on your engagement!",
    timestamp: "2023-06-06 13:10",
  },
  {
    id: 5,
    name: "Fiona",
    message: "Looking forward to the celebration!",
    timestamp: "2023-06-05 10:30",
  },
  {
    id: 4,
    name: "George",
    message: "Wishing you all the best on your journey together!",
    timestamp: "2023-06-04 15:45",
  },
  {
    id: 3,
    name: "Hannah",
    message: "So excited to be part of your special day!",
    timestamp: "2023-06-03 12:00",
  },
  {
    id: 2,
    name: "Ian",
    message: "Congratulations to the happy couple!",
    timestamp: "2023-06-02 09:20",
  },
  {
    id: 1,
    name: "Julia",
    message: "Can't wait to dance at your wedding!",
    timestamp: "2023-06-01 17:30",
  },
]

export function Messages() {
  const [messages, setMessages] = useState(initialMessages)
  const [loading, setLoading] = useState(false)

  const loadMore = () => {
    setLoading(true)
    // Simulating an API call to load more messages
    setTimeout(() => {
      const newMessages: Message[] = [
        {
          id: messages.length + 1,
          name: "New Guest",
          message: "Another congratulatory message!",
          timestamp: "2023-05-31 14:00",
        },
        {
          id: messages.length + 2,
          name: "Another Guest",
          message: "Looking forward to the wedding!",
          timestamp: "2023-05-30 11:30",
        },
      ]
      setMessages([...messages, ...newMessages])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-2 text-xl font-semibold">Messages</h2>
      <div className="space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="rounded-lg bg-[#f0f2f5] p-2">
            <p className="text-sm font-semibold">{msg.name}</p>
            <p className="text-sm">{msg.message}</p>
            <p className="text-xs text-gray-500">{msg.timestamp}</p>
          </div>
        ))}
      </div>
      <Button
        onClick={loadMore}
        disabled={loading}
        className="mt-4 w-full bg-[#25d366] hover:bg-[#006e5a]"
      >
        {loading ? "Loading..." : "Load More"}
      </Button>
    </div>
  )
}
