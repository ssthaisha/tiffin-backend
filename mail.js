var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tiffinbatta14@gmail.com',
    pass: 'nsncudgmuzgsavnm'
  },
  port: 465,
  host:'smtp.gmail.com'
});

var mailOptions = {
  from: 'tiffinbatta14@gmail.com',
  to: 'ssthaisha01@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});