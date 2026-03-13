const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/fixtures', async (req, res) => {
  try {
    const date = req.query.date;
    const response = await fetch(`https://v3.football.api-sports.io/fixtures?date=${date}&timezone=Europe/Istanbul`, {
      headers: {
        'x-apisports-key': '2a62e6f91d6e9861535bda639c11ed88'
      }
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
