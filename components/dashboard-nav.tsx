'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Library, Users, Upload } from 'lucide-react'

const navItems = [
  {
    title: "Books",
    href: "/dashboard/books",
    icon: Library
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users
  },
  {
    title: "Upload",
    href: "/dashboard/upload",
    icon: Upload
  }
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-2 mb-6">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Button
            key={item.href}
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn(
              "gap-2",
              pathname === item.href && "bg-primary text-primary-foreground"
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}