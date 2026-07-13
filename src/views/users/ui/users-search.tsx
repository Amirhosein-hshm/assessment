"use client"

import { useState, useEffect } from "react"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { SearchIcon, ArrowUpDownIcon } from "lucide-react"
import { useDebounce } from "@/shared/lib/hooks/use-debounce"
import type { SortField, SortOrder, UrlParams } from "../model/user"

interface UsersSearchProps {
  params: UrlParams
  onParamsChange: (updates: Partial<UrlParams>) => void
}

export function UsersSearch({ params, onParamsChange }: UsersSearchProps) {
  const [name, setName] = useState(params.name)
  const [email, setEmail] = useState(params.email)

  const debouncedName = useDebounce(name, 400)
  const debouncedEmail = useDebounce(email, 400)

  useEffect(() => {
    setName(params.name)
    setEmail(params.email)
  }, [params.name, params.email])

  useEffect(() => {
    if (debouncedName === params.name && debouncedEmail === params.email) return
    onParamsChange({ name: debouncedName, email: debouncedEmail })
  }, [debouncedName, debouncedEmail, onParamsChange, params.name, params.email])

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
          onValueChange={(value) =>
            value && onParamsChange({ sortBy: value as SortField })
          }
        >
          <SelectTrigger className="w-[130px]">
            <ArrowUpDownIcon className="size-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={params.sortOrder}
          onValueChange={(value) =>
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
