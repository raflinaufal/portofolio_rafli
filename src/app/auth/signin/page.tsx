'use client'

import { signIn, getSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Github } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/')
      }
    })
  }, [router])

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your portfolio dashboard and chat room
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in with your Google account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleGoogleSignIn}
              className="w-full"
              size="lg"
            >
              <Github className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                By signing in, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <span className="text-blue-600 hover:text-blue-500">
              Contact the administrator
            </span>
          </p>
        </div>
      </div>
    </div>
  )
} 