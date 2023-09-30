const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const sendmail = require('./mail');
const app = express()
const nodemailer = require('nodemailer');
const cors = require('cors');

const corsOptions = {
  origin: '*', // Allow requests from any origin (not recommended for production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and credentials to be sent
};




  
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/getData',(req,res)=>{
     console.log("hiiii")
  res.send("hi")
})


app.post('/getFormDetails', async (req, res) => {
    try {
      const data = JSON.parse(req.body.data);
  
      const body = `
        <h3>You've got a new Form Submission</h3>
        <h5>Contact Details</h5>
        <ul>
          <li>Contact Name: ${data.name[0]} ${data.name[1]}</li>
          <li>Contact Phone: ${data.phone}</li>
          <li>Contact E-mail: ${data.email}</li>
          <li>Year: ${data.year}</li>
          <li>Grad: ${data.grad}</li>
          <li>Nationality: ${data.nationality}</li>
          <li>School: ${data.school}</li>
          <li>Programs: ${data.programs.join(', ')}</li>
        </ul>
      `;
  
      await sendMail(body);
      res.status(200).json({ msg: 'Success' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  function sendMail(body) {
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",  // enter host name
        port: "465", //enter port name
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'priyamishraforwork@gmail.com', // write your smtp account user name
          pass: 'ffzb slxn mbgw mpvg' // write your smtp account user password
        },
        tls : { 
              rejectUnauthorized : false  // Important for sendimg mail from localhost
        }
      });
  
      let mailOptions = {
        from: 'priyamishraforwork@gmail.com',
        to: 'info@haleeducation.com',
        subject: 'New Form Submission',
        html: body
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          reject(error);
        } else {
          console.log('Email sent:', info.messageId);
          resolve();
        }
      });
    });
  }
  

// // sendmail post request
// app.post('/getFormDetails',(req,res)=>{
//     console.log(req.body.data, "98765456789098765467890-98")
//     const data = JSON.parse(req.body.data)

//                 // const subject = "New Contact Request"
//                 const body = `
//                 <h3>You've got a new Form Submission</h3>
//                 <h5>Contact Details</h5>
//                 <ul>
//                   <li>Contact Name: ${data.name[0]} ${data.name[1]}</li>
//                   <li>Contact Phone: ${data.phone}</li>
//                   <li>Contact E-mail: ${data.email}</li>
//                   <li>Year: ${data.year}</li>
//                   <li>Grad: ${data.grad}</li>
//                   <li>Nationality: ${data.nationality}</li>
//                   <li>School: ${data.school}</li>
//                   <li>Programs: ${data.programs.join(', ')}</li>
//                 </ul>
//               `;
              
//                 if(sendmail(body)) {  
//                     res.status(200).json({
//                         msg : 'Success'
//                     });            
//                 } 
// });

// function sendmail(body) {
//     // create reusable transporter object using the default SMTP transport

//     let transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",  // enter host name
//       port: "465", //enter port name
//       secure: true, // true for 465, false for other ports
//       auth: {
//         user: 'priyamishraforwork@gmail.com', // write your smtp account user name
//         pass: 'ffzb slxn mbgw mpvg' // write your smtp account user password
//       },
//       tls : { 
//             rejectUnauthorized : false  // Important for sendimg mail from localhost
//       }
//     });
//     // send mail with defined transport object
//     let info = transporter.sendMail({
//       from: 'form-data@gmail.com', // sender address
//       to: "mishrapriya9999@gmail.com", // list of receivers
//       subject: "New Form Submission", // Subject line
//       html: body, // plain text body
//       //html: "987657890" // html body
//     });
  
//     console.log("Message sent: %s", info.messageId);
//   }

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`);
});




// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const https = require('https');
// const fs = require('fs');

// const corsOptions = {
//   origin: '*', // Adjust this for production to allow only specific origins
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // // Define your HTTPS server options
// // const httpsOptions = {
// //   key: fs.readFileSync('../private-key.pem'), // Update the path to your private key
// //   cert: fs.readFileSync('../certificate.pem'), // Update the path to your certificate
// //   ca: fs.readFileSync('../apig-cert.pem'), // Update the path to your CA certificate
// //   requestCert: true,
// //   rejectUnauthorized: true,
// // };

// // // Create an HTTPS server
// // const httpsServer = https.createServer(httpsOptions, app);

// // // Define a route for HTTPS server
// // app.get('/getData', (req, res) => {
// //   res.send("Hello from HTTPS server");
// // });

// // // Listen on port 443 for HTTPS traffic
// // httpsServer.listen(443, () => {
// //   console.log('HTTPS server is running on port 443');
// // });

// // // Define an HTTP server for redirection (optional)
// // const http = require('http');

// // const httpServer = http.createServer((req, res) => {
// //   // Redirect all HTTP requests to HTTPS
// //   res.writeHead(301, { 'Location': `https://${req.headers['host']}${req.url}` });
// //   res.end();
// // });

// // // Listen on port 80 for HTTP traffic (for redirection to HTTPS)
// // httpServer.listen(80, () => {
// //   console.log('HTTP server for redirection is running on port 80');
// // });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`HTTP server is running on port ${PORT}`);
// });
