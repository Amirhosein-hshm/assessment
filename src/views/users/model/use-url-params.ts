"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useMemo, useRef } from "react"
import type { SortField, SortOrder, UrlParams } from "./user"

const DEFAULT_PARAMS: UrlParams = {
  name: "",
  email: "",
  sortBy: "name",
  sortOrder: "asc",
}

export function useUrlParams() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const params: UrlParams = useMemo(
    () => ({
      name: searchParams.get("name") ?? DEFAULT_PARAMS.name,
      email: searchParams.get("email") ?? DEFAULT_PARAMS.email,
      sortBy: (searchParams.get("sortBy") as SortField) ?? DEFAULT_PARAMS.sortBy,
      sortOrder: (searchParams.get("sortOrder") as SortOrder) ?? DEFAULT_PARAMS.sortOrder,
    }),
    [searchParams]
  )

  const pushParams = useCallback(
    (updates: Partial<UrlParams>) => {
      const next = { ...params, ...updates }
      const sp = new URLSearchParams()
      if (next.name) sp.set("name", next.name)
      if (next.email) sp.set("email", next.email)
      sp.set("sortBy", next.sortBy)
      sp.set("sortOrder", next.sortOrder)
      const query = sp.toString()
      router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
    },
    [params, router, pathname]
  )

  const debouncedPushParams = useCallback(
    (updates: Partial<UrlParams>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        pushParams(updates)
      }, 300)
    },
    [pushParams]
  )

  return { params, pushParams, debouncedPushParams }
}
