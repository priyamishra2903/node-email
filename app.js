const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const corsOptions = {
  origin: '*', // Adjust this for production to allow only specific origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your HTTPS server options
const httpsOptions = {
  key: fs.readFileSync('../private-key.pem'), // Update the path to your private key
  cert: fs.readFileSync('../certificate.pem'), // Update the path to your certificate
  ca: fs.readFileSync('../apig-cert.pem'), // Update the path to your CA certificate
  requestCert: true,
  rejectUnauthorized: true,
};

// Create an HTTPS server
const httpsServer = https.createServer(httpsOptions, app);

// Define a route for HTTPS server
app.get('/getData', (req, res) => {
  res.send("Hello from HTTPS server");
});

// Listen on port 443 for HTTPS traffic
httpsServer.listen(443, () => {
  console.log('HTTPS server is running on port 443');
});

// Define an HTTP server for redirection (optional)
const http = require('http');

const httpServer = http.createServer((req, res) => {
  // Redirect all HTTP requests to HTTPS
  res.writeHead(301, { 'Location': `https://${req.headers['host']}${req.url}` });
  res.end();
});

// Listen on port 80 for HTTP traffic (for redirection to HTTPS)
httpServer.listen(80, () => {
  console.log('HTTP server for redirection is running on port 80');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HTTP server is running on port ${PORT}`);
});
