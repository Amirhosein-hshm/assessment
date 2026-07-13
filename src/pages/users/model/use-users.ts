import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/shared/api/api-client"
import type { User } from "./user"

async function fetchUsers(): Promise<User[]> {
  return apiClient<User[]>("/users")
}

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })
}
