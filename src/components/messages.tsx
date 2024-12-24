"use client"

import { useCallback, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

import { formatDateFromNow } from "@/lib/date"
import { api } from "@/trpc/react"

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
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchInterval: 1000,
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
      className={`rounded-lg bg-white p-4 shadow duration-500 ${
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
                <p className="text-sm font-semibold">{message.name}</p>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-500">
                  {formatDateFromNow(message.createdAt.toISOString(), "id")}
                </p>
              </div>
            )
          })
        })}
      </div>
    </div>
  )
}
