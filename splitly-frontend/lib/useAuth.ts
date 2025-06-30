'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './firebase'
import { useRouter } from 'next/navigation'

export function useAuth(protectedRoute = false) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)

      if (protectedRoute && !user) {
        router.push('/login')
      }
    })

    return () => unsub()
  }, [router, protectedRoute])

  return { user, loading }
}