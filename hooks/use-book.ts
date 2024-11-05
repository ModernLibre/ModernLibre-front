'use client'

import { useState, useEffect } from 'react'
import { fetchBook } from '@/lib/api'

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
    let mounted = true;

    async function getBook() {
      try {
        const data = await fetchBook(bookId)
        if (mounted) {
          setBook(data)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch book'))
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getBook()

    return () => {
      mounted = false
    }
  }, [bookId])

  return { book, loading, error }
}