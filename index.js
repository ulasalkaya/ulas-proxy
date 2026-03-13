const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

app.options('*', (req, res) => res.sendStatus(200));

app.get('/fixtures', async (req, res) => {
  try {
    const date = req.query.date;
    const response = await fetch(`https://v3.football.api-sports.io/fixtures?date=${date}&timezone=Europe/Istanbul`, {
      headers: { 'x-apisports-key': '2a62e6f91d6e9861535bda639c11ed88' }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/analyze', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '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',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Sunucu calisiyor!');
});
