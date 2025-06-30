'use client'

import Navbar from '@/components/Navbar'
import FetchSubscriptionsButton from '@/components/FetchSubscriptionsButton'
import PlaidLinkButton from '@/components/PlaidLinkButton'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <section className="flex flex-col items-center justify-center h-[90vh] px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Manage Shared Subscriptions with Ease
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Splitly uses secure Open Banking to detect, split, and track recurring payments — no more manual reminders or messy spreadsheets.
        </p>

        <div className="mb-4">
          <PlaidLinkButton />
          
        </div>
        <FetchSubscriptionsButton />
      </section>
    </main>
  )
}