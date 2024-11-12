'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Library, BookOpen, Heart, Clock } from 'lucide-react'
import Link from 'next/link'
import { useBooks } from '@/hooks/use-books'

export default function HomePage() {
  const { books } = useBooks()
  const recentBooks = books.slice(0, 5)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Library</CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.length}</div>
            <p className="text-xs text-muted-foreground">Total books in your library</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Reading</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Books in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Books you loved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recently Added Books</CardTitle>
          <Link 
            href="/library"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View Library →
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBooks.map((book) => (
              <Link 
                key={book.id} 
                href={`/library/${book.id}`}
                className="flex items-center gap-4 hover:bg-muted p-2 rounded-lg transition-colors"
              >
                <div className="w-12 h-16 relative bg-muted rounded overflow-hidden">
                  {book.cover_url && (
                    <img 
                      src={book.cover_url} 
                      alt={book.title}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{book.title}</h3>
                  {book.author && (
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}