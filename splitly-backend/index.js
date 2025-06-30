const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const plaidRoutes = require('./routes/plaidRoutes');
app.use('/api/plaid', plaidRoutes);

app.get('/', (req, res) => {
  res.send('Splitly Backend is Running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});