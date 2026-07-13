import { Suspense } from "react"
import { UsersPage } from "@/views/users"

export default function UsersRoute() {
  return (
    <Suspense fallback={null}>
      <UsersPage />
    </Suspense>
  )
}
