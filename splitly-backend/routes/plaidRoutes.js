const plaidClient = require('../services/plaidService');
const express = require('express');
const router = express.Router();

router.get('/link-token', async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'user-id-123' },
      client_name: 'Splitly App',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });

    res.json({ link_token: response.data.link_token });
  } catch (err) {
    console.error('Link token error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to create link token' });
  }
});

router.post('/exchange', async (req, res) => {
  const { public_token } = req.body;

  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    const access_token = response.data.access_token;

    res.json({ access_token });
  } catch (err) {
    console.error('Exchange error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Exchange failed' });
  }
});

module.exports = router;