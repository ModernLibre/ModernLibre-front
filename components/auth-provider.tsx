'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initCasdoorSDK } from '@/lib/casdoor'

// 定义用户接口
interface User {
  name: string;
  displayName: string;
  avatar: string;
  email: string;
  phone: string;
  [key: string]: any;
}

// 定义认证上下文类型接口
interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 认证提供者组件
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null) // 用户状态
  const [loading, setLoading] = useState(true) // 加载状态
  const router = useRouter() // 路由钩子

  useEffect(() => {
    // 检查localStorage中是否有用户信息
    const storedUser = localStorage.getItem('casdoorUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser)) // 设置用户状态
    }
    setLoading(false) // 设置加载状态为false
  }, [])

  // 登录函数
  const login = () => {
    const sdk = initCasdoorSDK() // 初始化Casdoor SDK
    if (sdk) {
      sdk.signin_redirect() // 调用SDK的登录重定向方法
    } else {
      console.error('Failed to initialize Casdoor SDK') // 初始化失败时输出错误信息
    }
  }

  // 登出函数
  const logout = () => {
    localStorage.removeItem('casdoorUser') // 移除localStorage中的用户信息
    setUser(null) // 设置用户状态为null
    router.push('/') // 重定向到首页
  }

  return (
    // 提供认证上下文
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// 自定义钩子，使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider') // 如果上下文未定义，抛出错误
  }
  return context
}