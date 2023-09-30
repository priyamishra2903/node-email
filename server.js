// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const nodemailer = require('nodemailer');
// const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');

// const corsOptions = {
//   origin: '*', // Adjust this for production to allow only specific origins
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Define your HTTPS server options
const options = {
  key: fs.readFileSync('certificates/key.pem'), // Update the path to your private key
  cert: fs.readFileSync('certificates/cert.pem'), // Update the path to your certificate
//   ca: fs.readFileSync('../apig-cert.pem'), // Update the path to your CA certificate
//   requestCert: true,
//   rejectUnauthorized: true,
};

https.createServer(options,(req,res)=>{
    console.log("90876578")
    res.end("ssl added")
}).listen(3000)

// const PORT = 3000
// app.listen(PORT, () => {
//     console.log(`HTTP server is running on port ${PORT}`);
//   });
  