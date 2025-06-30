'use client';

import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';

const PlaidLinkButton = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const res = await axios.get('http://localhost:5000/api/plaid/link-token');
      setLinkToken(res.data.link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = async (public_token: string) => {
    const res = await axios.post('http://localhost:5000/api/plaid/exchange', {
      public_token,
    });

    alert('Access Token Received! Check console.');
    console.log('Access Token:', res.data.access_token);
  };

  const { open, ready } = usePlaidLink({
    token: linkToken || 'Link_token_POC',
    onSuccess,
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="px-6 py-3 bg-green-600 text-white rounded-xl hover:scale-105 transition"
    >
      Link Bank Account
    </button>
  );
};

export default PlaidLinkButton;