// const http = require('http');

// const server = http.createServer((req, res) => {
//   const remoteIP = req.connection.remoteAddress;
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end(`Your IP address is: ${remoteIP}\n`);
// });

// const port = 3000;
// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');

const userIP = process.env.IP;

app.get('/', async (req, res) => {
  try {
    const clientIp = req.ip; // This retrieves the client's IP address
    console.log(clientIp,"client")

    // Make an HTTP request to retrieve location data based on the IP
    const locationResponse = await axios.get(`https://ipinfo.io/${clientIp}/json`);
    const locationData = locationResponse.data;

    res.json({ ip: clientIp, location: locationData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 4000; // Use the PORT from environment variables or default to 5060
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


 