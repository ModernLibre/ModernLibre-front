'use client'

import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: any | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const router = useRouter()

  const login = async (username: string, password: string) => {
    // Simulate API call
    if (username === 'admin' && password === 'admin') {
      setUser({ username, role: 'admin' })
      router.push('/dashboard')
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const logout = () => {
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}