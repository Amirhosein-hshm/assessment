"use client"

import { useState, useMemo } from "react"
import { AlertCircle } from "lucide-react"
import { useUsers } from "../model/use-users"
import { useUrlParams } from "../model/use-url-params"
import { UsersSearch } from "./users-search"
import { UsersTable } from "./users-table"
import { UserModal } from "./user-modal"
import type { User } from "../model/user"

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center">
      <AlertCircle className="size-8 text-destructive" />
      <p className="text-sm text-destructive">{message}</p>
    </div>
  )
}

export function UsersPage() {
  const { data: users, isLoading, error } = useUsers()
  const { params, debouncedPushParams } = useUrlParams()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filteredUsers = useMemo(() => {
    if (!users) return []

    let result = [...users]

    if (params.name) {
      const q = params.name.toLowerCase()
      result = result.filter((u) => u.name.toLowerCase().includes(q))
    }
    if (params.email) {
      const q = params.email.toLowerCase()
      result = result.filter((u) => u.email.toLowerCase().includes(q))
    }

    result.sort((a, b) => {
      const aVal = params.sortBy === "name" ? a.name.toLowerCase() : a.email.toLowerCase()
      const bVal = params.sortBy === "name" ? b.name.toLowerCase() : b.email.toLowerCase()
      return params.sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    })

    return result
  }, [users, params])

  function handleSelectUser(user: User) {
    setSelectedUser(user)
    setModalOpen(true)
  }

  if (error) {
    return <ErrorState message={error.message} />
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Users
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and view user profiles.
        </p>
      </div>
      <UsersSearch params={params} onParamsChange={debouncedPushParams} />
      <UsersTable
        users={filteredUsers}
        isLoading={isLoading}
        hasFilters={!!params.name || !!params.email}
        onSelectUser={handleSelectUser}
      />
      <UserModal
        user={selectedUser}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  )
}
