const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
const http = require('http');
const httpProxy = require('http-proxy');

const corsOptions = {
  origin: '*', // Allow requests from any origin (not recommended for production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and credentials to be sent
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getData', (req, res) => {
  res.send("hiiii");
});

// // HTTP-to-HTTPS proxy server setup
// const HTTP_PORT = 80; // Port for HTTP proxy
// const HTTPS_TARGET = {
//   target: '127.0.0.1', // Replace with your HTTPS server's address
//   changeOrigin: true, // Changes the host header to match the target host
// };

// const httpServer = http.createServer((req, res) => {
//   const proxy = httpProxy.createProxyServer(HTTPS_TARGET);
//   proxy.web(req, res, HTTPS_TARGET, (err) => {
//     console.error('Proxy error:', err);
//     res.status(500).send('Proxy error');
//   });
// });

// httpServer.listen(HTTP_PORT, () => {
//   console.log(`HTTP proxy server is running at port: ${HTTP_PORT}`);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
