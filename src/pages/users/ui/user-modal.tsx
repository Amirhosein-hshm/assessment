"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog"
import type { User } from "../model/user"

interface UserModalProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1.5">
      <span className="text-sm font-medium text-accent shrink-0">{label}</span>
      <span className="text-sm text-right text-foreground break-all">{value}</span>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </h3>
  )
}

export function UserModal({ user, open, onOpenChange }: UserModalProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{user.name}</DialogTitle>
          <DialogDescription>@{user.username}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <SectionTitle>Contact</SectionTitle>
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Phone" value={user.phone} />
            <DetailRow label="Website" value={user.website} />
          </div>
          <div className="flex flex-col gap-2">
            <SectionTitle>Address</SectionTitle>
            <DetailRow label="Street" value={user.address.street} />
            <DetailRow label="Suite" value={user.address.suite} />
            <DetailRow label="City" value={user.address.city} />
            <DetailRow label="Zipcode" value={user.address.zipcode} />
          </div>
          <div className="flex flex-col gap-2">
            <SectionTitle>Company</SectionTitle>
            <DetailRow label="Name" value={user.company.name} />
            <DetailRow label="Catch Phrase" value={user.company.catchPhrase} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
