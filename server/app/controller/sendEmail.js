'use strict'
const nodemailer = require('nodemailer');
// 创建可重用邮件传输器
const transporter = nodemailer.createTransport({
    host: "smtpdm.aliyun.com",
    port: 80,
    secureConnection: false, // use SSL
    auth: {
        "user": 'microcosm@dubo1994.com', // user name
        "pass": 'duBO1136559841'         // password
    }
});
module.exports.send =  (mailOptions) => {
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            return console.log(error);
        }
    });
}