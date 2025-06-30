const plaidClient = require('../services/plaidService');

const getTransactions = async (req, res) => {
  const { access_token } = req.body;

  try {
    const startDate = '2024-01-01';
    const endDate = '2025-01-01';

    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: startDate,
      end_date: endDate,
    });

    const transactions = response.data.transactions;
    
    const subscriptions = transactions.filter(tx =>
      tx.name.toLowerCase().includes('netflix') ||
      tx.name.toLowerCase().includes('spotify')
    );

    res.json({ subscriptions });
  } catch (err) {
    console.error('Plaid Error:', err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

module.exports = { getTransactions };