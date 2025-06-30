'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-wide">
          Splitly
        </Link>

        <div className="hidden md:flex gap-6 items-center text-sm">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-2 rounded-md font-medium hover:opacity-90 transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-white text-black px-4 py-2 rounded-md font-medium hover:opacity-90 transition">
                Login
              </button>
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          Menu
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 py-3 flex flex-col gap-3">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          {user ? (
            <button onClick={() => { handleLogout(); setOpen(false); }}>Logout</button>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}