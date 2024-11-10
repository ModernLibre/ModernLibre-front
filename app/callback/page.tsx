'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initCasdoorSDK } from '@/lib/casdoor'

interface User {
  name: string;
  displayName: string;
  avatar: string;
  email: string;
  phone: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if we have a user in localStorage
    const storedUser = localStorage.getItem('casdoorUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = () => {
    const sdk = initCasdoorSDK()
    if (sdk) {
      sdk.signin_redirect()
    } else {
      console.error('Failed to initialize Casdoor SDK')
    }
  }

  const logout = () => {
    localStorage.removeItem('casdoorUser')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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