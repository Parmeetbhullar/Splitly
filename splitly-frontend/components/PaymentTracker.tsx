'use client'

export default function PaymentTracker() {
  const rows = [
    { name: 'Alice', sub: 'Netflix', amt: '$8.00', date: '2025-06-01', status: 'Paid' },
    { name: 'Bob', sub: 'Spotify', amt: '$4.00', date: '2025-06-02', status: 'Pending' },
    { name: 'Charlie', sub: 'Disney+', amt: '$5.00', date: '2025-06-03', status: 'Paid' },
  ]

  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-white">
      <h2 className="text-2xl font-bold mb-4">Payment Tracker – Roommates</h2>

      <div className="grid grid-cols-3 gap-6 text-sm mb-6">
        <div>
          <p className="text-gray-400">Total Shared Subscriptions</p>
          <p className="font-medium text-white">3</p>
        </div>
        <div>
          <p className="text-gray-400">Total Monthly Cost</p>
          <p className="font-medium text-white">$32.00</p>
        </div>
        <div>
          <p className="text-gray-400">Split Per Person</p>
          <p className="font-medium text-white">$10.67</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="py-2 px-4">Member</th>
              <th className="py-2 px-4">Subscription</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Paid On</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/10">
                <td className="py-2 px-4">{row.name}</td>
                <td className="py-2 px-4">{row.sub}</td>
                <td className="py-2 px-4">{row.amt}</td>
                <td className="py-2 px-4">{row.date}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      row.status === 'Paid'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}