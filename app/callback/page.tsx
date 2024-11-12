'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { initCasdoorSDK } from '@/lib/casdoor'
import { toast } from 'sonner'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const state = searchParams.get('state')
      const storedState = localStorage.getItem('casdoorState')

      console.log('Callback received:', { code, state })

      if (!code || !state) {
        console.error('Missing code or state')
        toast.error('Authentication failed: Missing parameters')
        router.push('/login')
        return
      }

      // Verify state to prevent CSRF attacks
      // if (state !== storedState) {
      //   console.error('State mismatch', { received: state, stored: storedState })
      //   toast.error('Authentication failed: Invalid state')
      //   router.push('/login')
      //   return
      // }

      try {
        toast.info('Authenticating...')
        const response = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        })

        const data = await response.json()

        if (data.success && data.accessToken) {
          // Get user info with the access token
          const userResponse = await fetch('/api/user', {
            headers: {
              'Authorization': `Bearer ${data.accessToken}`,
            },
          })

          const userData = await userResponse.json()
          localStorage.setItem('casdoorUser', JSON.stringify(userData))
          localStorage.removeItem('casdoorState')
          toast.success('Successfully logged in!')
          router.push('/')
        } else {
          throw new Error('Failed to get access token')
        }
      } catch (error) {
        console.error('Authentication error:', error)
        toast.error('Authentication failed')
        router.push('/login')
      }
    }

    handleCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-muted-foreground">Please wait while we complete the login process.</p>
      </div>
    </div>
  )
}