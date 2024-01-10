const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/futbin-data', (req, res) => {
  // Get the 'player' parameter from the query string
  const playerParam = req.query.player;

  if (!playerParam) {
    return res.status(400).json({ error: 'Missing player parameter' });
  }

  // Set up proxy authentication options
  const proxyOptions = {
    url: `https://www.futbin.com/24/playerPrices?player=${playerParam}`,
    // Uncomment the following lines if you need proxy authentication
    // proxy: 'http://38.154.227.167:5868/',
    // proxyAuth: 'hztgityv:zzs74lhk2eaj',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14931',
      'Content-Type': 'application/json',
      'Allow-origin': '*',
    },
  };

  // Make a GET request to Futbin API
  request.get(proxyOptions, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Response:', body);
      res.json(JSON.parse(body));
    }
  });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on port ${port}`);
});
