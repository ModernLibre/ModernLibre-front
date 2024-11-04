'use client'

import { useState, useEffect } from 'react'

export interface Book {
  id: number
  title: string
  author?: string
  description?: string
  status?: number
  rating?: number
  addedDate?: string
  cover_url?: string
}

export function useBook(bookId: number) {
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`http://localhost:8000/library/${bookId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch book')
        }
        const data = await response.json()
        setBook(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch book'))
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [bookId])

  return { book, loading, error }
}