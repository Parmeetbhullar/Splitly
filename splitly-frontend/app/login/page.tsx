'use client'

import { useEffect, useState } from 'react'
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { auth, provider } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
      if (firebaseUser) router.push('/dashboard')
    })

    return () => unsubscribe()
  }, [router])

  const handleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Sign-in failed:', error)
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Sign-out failed:', error)
    }
  }

  if (loading) {
    return (
      <button
        disabled
        className="w-full bg-gray-700 text-white py-3 rounded-lg font-medium animate-pulse"
      >
        Checking auth...
      </button>
    )
  }

  return user ? (
    <button
      onClick={handleSignOut}
      className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
    >
      Sign Out ({user.displayName?.split(' ')[0] || 'User'})
    </button>
  ) : (
    <button
      onClick={handleSignIn}
      className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4285F4"
        d="M533.5 278.4c0-18.4-1.5-36.4-4.4-53.6H272v101.5h146.9c-6.4 34.3-25.2 63.3-53.6 82.8v68h86.5c50.5-46.5 81.7-115.1 81.7-198.7z"
      />
      <path
        fill="#34A853"
        d="M272 544.3c72.6 0 133.4-24 177.9-65.2l-86.5-68c-24.1 16.1-55 25.6-91.4 25.6-70 0-129.2-47.2-150.4-110.3H32.2v69.5c44.6 87.8 136.2 148.4 239.8 148.4z"
      />
      <path
        fill="#FBBC05"
        d="M121.6 326.4c-10.3-30.2-10.3-62.7 0-92.9V164h-89.4c-36.4 70.5-36.4 153.1 0 223.6l89.4-69.2z"
      />
      <path
        fill="#EA4335"
        d="M272 107.2c39.5-.6 77.4 14.3 106.2 41.2l79.5-77.6C407.2 25.2 341.6 0 272 0 168.4 0 76.8 60.6 32.2 148.4l89.4 69.5C142.8 154.4 202 107.2 272 107.2z"
      />
    </svg>
  )
}