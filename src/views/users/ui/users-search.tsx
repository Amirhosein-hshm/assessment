"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { SearchIcon, ArrowUpDownIcon } from "lucide-react"
import type { SortField, SortOrder } from "../model/user"
import type { UrlParams } from "../model/user"

interface UsersSearchProps {
  params: UrlParams
  onParamsChange: (updates: Partial<UrlParams>) => void
}

export function UsersSearch({ params, onParamsChange }: UsersSearchProps) {
  const [name, setName] = useState(params.name)
  const [email, setEmail] = useState(params.email)
  const mounted = useRef(false)
  const externalSync = useRef(false)

  useEffect(() => {
    mounted.current = true
  }, [])

  useEffect(() => {
    if (!mounted.current) return
    externalSync.current = true
    setName(params.name)
    setEmail(params.email)
    requestAnimationFrame(() => {
      externalSync.current = false
    })
  }, [params.name, params.email])

  useEffect(() => {
    if (!mounted.current || externalSync.current) return
    const timer = setTimeout(() => {
      onParamsChange({ name, sortBy: "name" })
    }, 500)
    return () => clearTimeout(timer)
  }, [name, onParamsChange])

  useEffect(() => {
    if (!mounted.current || externalSync.current) return
    const timer = setTimeout(() => {
      onParamsChange({ email, sortBy: "email" })
    }, 500)
    return () => clearTimeout(timer)
  }, [email, onParamsChange])

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="flex gap-2">
        <Select
          value={params.sortBy}
          onValueChange={(value: string | null) =>
            value && onParamsChange({ sortBy: value as SortField })
          }
        >
          <SelectTrigger className="w-[130px]">
            <ArrowUpDownIcon className="size-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={params.sortOrder}
          onValueChange={(value: string | null) =>
            value && onParamsChange({ sortOrder: value as SortOrder })
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
