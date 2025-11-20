// zillow.js
// Usage: node zillow.js <PORT>

const express = require('express');
const app = express();

// Simulated database
const HOUSES = [
  { price: 240000, city: "baltimore" },
  { price: 300000, city: "austin" },
  { price: 400000, city: "austin" },
  { price: 1000000, city: "seattle" },
  { price: 325000, city: "baltimore" },
  { price: 550000, city: "seattle" },
  { price: 250000, city: "boston" },
];

// Helpers
const isNonNegativeIntegerStr = (s) => typeof s === 'string' && /^[0-9]+$/.test(s);

// Routes
app.get('/v1/zillow/zestimate', (req, res) => {
  const { sqft, bed, bath } = req.query;

  if (!(isNonNegativeIntegerStr(sqft) && isNonNegativeIntegerStr(bed) && isNonNegativeIntegerStr(bath))) {
    // Invalid/missing arguments -> 404
    return res.status(404).json({});
  }

  const zestimate = Number(sqft) * Number(bed) * Number(bath) * 10;
  return res.status(200).json({ zestimate });
});

app.get('/v1/zillow/houses', (req, res) => {
  const { city } = req.query;

  if (!city || String(city).trim() === '') {
    // No city provided -> empty list
    return res.status(200).json([]);
  }

  const queryCity = String(city).toLowerCase();
  const result = HOUSES.filter(h => h.city.toLowerCase() === queryCity);
  return res.status(200).json(result);
});

// endpoint for prices under a given amount
app.get('/v1/zillow/prices', (req, res) => {
  const { usd } = req.query;
  if (!isNonNegativeIntegerStr(usd)) {
    // Missing/invalid param -> 404
    return res.status(404).json({});
  }
  const max = Number(usd);
  // "Under" interpreted as strictly less than the given price
  const result = HOUSES.filter(h => h.price < max);
  return res.status(200).json(result);
});

// 404 handler for invalid endpoints
app.use((req, res) => {
  return res.sendStatus(404);
});

// Start server on the port provided as the first CLI argument
const portArg = process.argv[2];
if (!portArg || !/^[0-9]+$/.test(portArg)) {
  console.error('Usage: node zillow.js <PORT>');
  process.exit(1);
}
const PORT = Number(portArg);

app.listen(PORT, () => {
  console.log(`Zillow API server listening on port ${PORT}`);
});
