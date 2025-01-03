"use client"

import { useCallback, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

import { formatDateFromNow } from "@/lib/date"
import { api } from "@/trpc/react"
import { VoiceNote } from "./voice-note"

export function Messages() {
  const {
    data: messages,
    hasNextPage,
    fetchNextPage,
  } = api.message.getLatest.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      initialCursor: null,
      // refetchInterval: 1000,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    },
  )

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const handleObserver = useCallback(
    ([target]: IntersectionObserverEntry[]) => {
      if (target?.isIntersecting && hasNextPage) {
        void fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage],
  )

  useEffect(() => {
    const lmRef = loadMoreRef.current
    const observer = new IntersectionObserver(handleObserver)

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)

    return () => {
      if (lmRef) observer.unobserve(lmRef)
    }
  }, [handleObserver])

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div
      ref={ref}
      className={`duration-2s rounded-lg bg-white p-4 shadow ${
        inView ? "animate-in slide-in-from-bottom" : "opacity-0"
      }`}
    >
      <h2 className="mb-2 text-xl font-semibold">Pesan</h2>
      <div className="space-y-2">
        {messages?.pages.map((page) => {
          return page.messages.map((message) => {
            return (
              <div
                key={message.id}
                className="space-y-0.5 rounded-lg bg-[#f0f2f5] p-2"
              >
                <div className="flex flex-row items-center space-x-2">
                  <p className="text-sm font-semibold">{message.name}</p>
                  {message.willAttend === "hadir" ? (
                    <p className="text-xs text-green-500">
                      {message.willAttend}
                    </p>
                  ) : (
                    <p className="text-xs text-red-500">{message.willAttend}</p>
                  )}
                </div>
                <p className="text-base">{message.content}</p>
                {message.voiceNote && <VoiceNote url={message.voiceNote} />}
                <p className="text-xs text-gray-500">
                  {formatDateFromNow(message.createdAt.toISOString(), "id")}
                </p>
              </div>
            )
          })
        })}
      </div>
      <div ref={loadMoreRef} className="h-1" />
    </div>
  )
}
