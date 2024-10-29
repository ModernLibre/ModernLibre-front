'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Star } from 'lucide-react'

const books = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    rating: 4.5,
    cover: "/static/books/design-of-everyday-things.jpg"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    cover: "/static/books/atomic-habits1.jpg"
  },
  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    rating: 4.6,
    cover: "/static/books/deep-work1.jpg"
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: 4.7,
    cover: "/static/books/psychology-of-money.jpg"
  }
]

export function BookGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {books.map((book) => (
        <Card key={book.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-[2/3] relative group">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="icon" className="mr-2">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-4">
            <h3 className="font-semibold line-clamp-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm">{book.rating}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}