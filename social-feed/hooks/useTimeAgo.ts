"use client"

import { useEffect, useState } from "react"
import { timeAgo } from "../lib/timeAgo"

export function useTimeAgo(date: Date) {
  const [relativeTime, setRelativeTime] = useState(timeAgo(date))

  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(timeAgo(date))
    }, 60000) // update every 1 min

    return () => clearInterval(interval)
  }, [date])

  return relativeTime
}
