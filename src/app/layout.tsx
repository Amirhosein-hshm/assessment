import type { Metadata } from "next"
import { Fira_Code, Fira_Sans } from "next/font/google"
import { QueryProvider } from "@/app/providers/query-provider"
import { TooltipProvider } from "@/shared/ui/tooltip"
import "./globals.css"

const firaSans = Fira_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const firaCode = Fira_Code({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "User Management",
    template: "%s | User Management",
  },
  description: "User management dashboard built with Next.js App Router",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${firaSans.variable} ${firaCode.variable}`}>
      <body>
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
