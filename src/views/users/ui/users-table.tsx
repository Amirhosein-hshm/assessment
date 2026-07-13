"use client"

import { useRef, type UIEvent } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Skeleton } from "@/shared/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/tooltip"
import type { User } from "../model/user"

const ROW_HEIGHT = 52

interface UsersTableProps {
  users: User[]
  isLoading: boolean
  hasFilters?: boolean
  onSelectUser: (user: User) => void
}

function SkeletonRows() {
  return (
    <TableBody>
      {Array.from({ length: 10 }).map((_, i) => (
        <TableRow key={i} style={{ height: ROW_HEIGHT }}>
          <TableCell className="w-[180px]">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="w-[220px]">
            <Skeleton className="h-4 w-44" />
          </TableCell>
          <TableCell className="w-[180px]">
            <Skeleton className="h-4 w-36" />
          </TableCell>
          <TableCell className="w-[160px]">
            <Skeleton className="h-4 w-28" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
          {hasFilters
            ? "No users match your search criteria."
            : "No users available."}
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export function UsersTable({ users, isLoading, hasFilters = false, onSelectUser }: UsersTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  })

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Name</TableHead>
            <TableHead className="w-[220px]">Email</TableHead>
            <TableHead className="w-[180px]">Phone</TableHead>
            <TableHead className="w-[160px]">Company</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div
        ref={scrollRef}
        className="overflow-auto"
        style={{ maxHeight: "calc(100vh - 280px)" }}
      >
        <Table>
          {isLoading ? (
            <SkeletonRows />
          ) : users.length === 0 ? (
            <EmptyState hasFilters={hasFilters} />
          ) : (
            <TableBody
              className="relative"
              style={{ height: `${virtualizer.getTotalSize()}px` }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const user = users[virtualRow.index]
                return (
                  <TableRow
                    key={user.id}
                    data-index={virtualRow.index}
                    className="absolute left-0 top-0 flex w-full cursor-pointer border-b transition-all hover:bg-muted/50 active:scale-[0.98]"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    onClick={() => onSelectUser(user)}
                  >
                    <TableCell className="flex w-[180px] items-center truncate">
                      <Tooltip>
                        <TooltipTrigger className="truncate text-left">
                          {user.name}
                        </TooltipTrigger>
                        <TooltipContent>{user.name}</TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="flex w-[220px] items-center truncate">
                      <Tooltip>
                        <TooltipTrigger className="truncate text-left">
                          {user.email}
                        </TooltipTrigger>
                        <TooltipContent>{user.email}</TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="flex w-[180px] items-center truncate">
                      {user.phone}
                    </TableCell>
                    <TableCell className="flex w-[160px] items-center truncate">
                      <Tooltip>
                        <TooltipTrigger className="truncate text-left">
                          {user.company.name}
                        </TooltipTrigger>
                        <TooltipContent>{user.company.name}</TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  )
}
