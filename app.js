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

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})


// sendmail post request
app.post('/sendmail',(req,res)=>{
    console.log(req.body)
    // const name = req.body.name;
    // const email = req.body.email;
    // const phone = req.body.phone;
    // const message  = req.body.msg;

    // if(!name || !email || !phone || !message){ // Check if any field is empty or not !!!
    //     res.status(200).json({
    //         msg : 'Some Fields Are Empty !!!'
    //     });
    // }else {   // if not empty
    //     if(/^\d{10}$/.test(phone)){ //Check Phone Number if okay

    //         if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) // Check if mail address is correct
    //         {
    //             const subject = "New Contact Request"
    //             const body = `
    //             <h3>You've got a new contact request</h3>
    //             <h5>Contact Details</h5>
    //             <ul>
    //               <li>Contact Name : ${name}</li>
    //               <li>Contact Phone : ${phone}</li>
    //               <li>Contact E-mail : ${email}</li>
    //               <li>Message : ${message}</li>
    //             </ul>
    //           `;
                if (sendmail("hello","hi")) { //Calling Mail function to send mail
                    res.status(200).json({
                        msg : 'Success'
                    });            
                } 


    //         }else {  // if mail is not correct
    //             res.status(200).json({
    //                 msg : 'Invalid Mail Address !!!'
    //             });
    //         }

    //     } else {// if phone number is wrong
    //         res.status(200).json({
    //             msg : 'Invalid Phone Number !!!'
    //         });
    //     }
    // }
});

function sendmail(subject,body) {

    // create reusable transporter object using the default SMTP transport

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
    // send mail with defined transport object
    let info = transporter.sendMail({
      from: 'priyamishraforwork@gmail.com', // sender address
      to: "mishrapriya9999@gmail.com", // list of receivers
      subject: "heyaa", // Subject line
      text: "", // plain text body
      //html: "987657890" // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  }

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`);
});