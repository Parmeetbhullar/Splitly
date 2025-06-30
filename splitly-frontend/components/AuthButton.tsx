'use client'

import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '@/lib/firebase'
import { useEffect, useState } from 'react'

export default function AuthButton() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u))
    return () => unsub()
  }, [])

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignOut = () => {
    signOut(auth)
  }

  return user ? (
    <button
      onClick={handleSignOut}
      className="bg-white text-black font-medium py-3 px-6 rounded-xl hover:scale-105 transition"
    >
      Sign Out ({user.displayName})
    </button>
  ) : (
    <button
      onClick={handleSignIn}
      className="bg-white text-black font-semibold py-3 px-6 rounded-xl hover:scale-105 transition shadow-md"
    >
      Sign in with Google
    </button>
  )
}