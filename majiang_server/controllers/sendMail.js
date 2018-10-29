
var nodemailer = require('nodemailer'); 
var transporter = nodemailer.createTransport({ 
    service: 'qq', 
    auth: { 
    user: '381042434@qq.com', 
    pass: 'lplggamkkkvxbgfg' //授权码,通过QQ获取 
    
    } 
 }); 
  var sendMail = function (recipient, subject, html,callback) {

    transporter.sendMail({

        from: "381042434@qq.com",
        to: recipient,
        subject: subject,
        html: html

    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        callback();
    });
  }
 module.exports = sendMail;