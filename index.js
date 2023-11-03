// const express = require('express')
// const app = express()
// const port = 3000
// const IP = require('ip');

// app.get('https://ipgeolocation.abstractapi.com/v1/?api_key=9aae9370161a4c5f8d955aab63a48779&ip_address=92.184.105.98', (req, res) => {
//     const ipAddress = IP.address();
//     res.send(ipAddress)
// })
// //https://ipgeolocation.abstractapi.com/v1/?api_key=9aae9370161a4c5f8d955aab63a48779
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express');
const axios = require('axios');
require('dotenv').config();
const IP = require('ip'); // If you want to capture the client's IP address

const app = express();

app.get('/', async (req, res) => {
  try {
    const ipAddress = IP.address();

    console.log(ipAddress,"ip") // The most common IP version assigned by ISPs
    console.log(req.connection.remoteAddress,"ip")
  
    const clientIPAddress = req.ip;

    const apiKey = process.env.API_KEY; 
    const ipToLookup =clientIPAddress; // process.env.NET_IP;
    console.log(apiKey,ipToLookup)
    const apiUrl = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=${ipToLookup}`;

    const response = await axios.get(apiUrl);
    const geolocationData = response.data;

   
    res.json(geolocationData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching IP geolocation data.' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
