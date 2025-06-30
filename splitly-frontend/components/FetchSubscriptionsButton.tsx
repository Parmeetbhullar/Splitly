'use client';

import React, { useState } from 'react';
import axios from 'axios';

type Subscription = {
  name: string;
  amount: number;
};

const FetchSubscriptionsButton = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const accessToken = 'access-sandbox-7d08557c-64fa-4a44-9f6d-d9b958998382';

      const res = await axios.post('http://localhost:5000/api/plaid/transactions', {
        access_token: accessToken,
      });

      const result = res.data?.subscriptions || [];
      setSubscriptions(result);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch subscriptions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={fetchSubscriptions}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch Subscriptions'}
      </button>

      <div className="mt-4">
        {subscriptions.length > 0 ? (
          <ul className="list-disc pl-5">
            {subscriptions.map((sub, i) => (
              <li key={i}>
                {sub.name} — ${Number(sub.amount).toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No subscriptions found.</p>
        )}
      </div>
    </div>
  );
};

export default FetchSubscriptionsButton;