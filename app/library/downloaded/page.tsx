'use client'

import { useState } from 'react'
import { BookGrid } from "@/components/book-grid"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { Search, Download } from 'lucide-react'
import Link from 'next/link'

export default function DownloadedPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <h1 className="text-2xl font-bold">ModernLibre</h1>
          </Link>
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search downloaded books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-6 flex gap-6">
        <Sidebar className="w-64 flex-shrink-0" />
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Download className="h-6 w-6" />
              Downloaded Books
            </h2>
          </div>
          <BookGrid />
        </main>
      </div>
    </div>
  )
}