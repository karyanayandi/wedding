"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"

import { Button } from "@/components/ui/button"
import { api } from "@/trpc/react"

interface Message {
  id: number
  name: string
  content: string
  createdAt: Date
}

export function Messages() {
  const { data: initialMessages, isLoading } = api.message.getLatest.useQuery({
    page: 1,
    perPage: 10,
  })

  // const { data: totalMessages } = api.message.count.useQuery()

  const [page, setPage] = useState(1)
  const [messages, setMessages] = useState<Message[]>(initialMessages ?? [])
  const [loading, setLoading] = useState(false)

  const loadMore = () => {
    setLoading(true)
    setPage((prevPage) => prevPage + 1)
    try {
      const { data: newMessages } = api.message.getLatest.useQuery(
        {
          page,
          perPage: 10,
        },
        {
          placeholderData: (previousData) => previousData,
        },
      )
      if (newMessages && newMessages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...(newMessages ?? [])])
      }
    } catch (error) {
      console.error("Error loading more messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div
      ref={ref}
      className={`rounded-lg bg-white p-4 shadow duration-500 ${
        inView ? "animate-in slide-in-from-bottom" : "opacity-0"
      }`}
    >
      <h2 className="mb-2 text-xl font-semibold">Messages</h2>
      <div className="space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="rounded-lg bg-[#f0f2f5] p-2">
            <p className="text-sm font-semibold">{msg.name}</p>
            <p className="text-sm">{msg.content}</p>
            <p className="text-xs text-gray-500">
              {msg.createdAt.toISOString()}
            </p>
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
