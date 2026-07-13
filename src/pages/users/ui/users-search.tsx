"use client"

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
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          value={params.name}
          onChange={(e) =>
            onParamsChange({ name: e.target.value, sortBy: "name" })
          }
          className="pl-8"
        />
      </div>
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by email..."
          value={params.email}
          onChange={(e) =>
            onParamsChange({ email: e.target.value, sortBy: "email" })
          }
          className="pl-8"
        />
      </div>
      <div className="flex gap-2">
        <Select
          value={params.sortBy}
          onValueChange={(value: SortField) =>
            onParamsChange({ sortBy: value })
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
          onValueChange={(value: SortOrder) =>
            onParamsChange({ sortOrder: value })
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
