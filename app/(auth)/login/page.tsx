'use client'

import { useAuth } from '@/components/auth-provider'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Library, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const { login } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <Link 
        href="/library" 
        className="absolute top-4 left-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Library className="h-8 w-8" />
          </div>
          <CardTitle>ModernLibre Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            onClick={login}
          >
            Sign in with Casdoor
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}