'use client'

import { useAuth } from '@/lib/useAuth'
import Navbar from '@/components/Navbar'
import PaymentTracker from '@/components/PaymentTracker'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const chartData = [
  { name: 'Netflix', value: 18 },
  { name: 'Spotify', value: 10 },
  { name: 'iCloud', value: 4 },
  { name: 'Others', value: 8 },
]

const COLORS = ['#00E3B1', '#F472B6', '#60A5FA', '#A78BFA']

const groups = [
  {
    name: 'Roommates',
    members: 3,
    subscriptions: ['Netflix', 'Spotify'],
  },
  {
    name: 'Family',
    members: 4,
    subscriptions: ['YouTube Premium'],
  },
]

const recentCharges = [
  { service: 'Netflix', date: '2025-06-28', amount: 18.0 },
  { service: 'Spotify', date: '2025-06-27', amount: 10.0 },
  { service: 'iCloud', date: '2025-06-25', amount: 3.99 },
]

export default function DashboardPage() {
  const { user, loading } = useAuth(true)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0e0e0e] text-white px-6 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user?.displayName}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 bg-white/5 border border-white/10 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Spending Breakdown</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="col-span-1 bg-white/5 border border-white/10 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
            <div className="space-y-4">
              {groups.map((group, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition"
                >
                  <h3 className="text-lg font-medium">{group.name}</h3>
                  <p className="text-sm text-gray-300">
                    {group.members} members ·{' '}
                    {group.subscriptions.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 bg-white/5 border border-white/10 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Recent Charges</h2>
            <ul className="space-y-3">
              {recentCharges.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{item.service}</span>
                  <span className="text-gray-400">{item.date}</span>
                  <span className="font-medium">
                    ${item.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        <div className="mt-10">
          <PaymentTracker />
        </div>
      </div>
    </>
  )
}