'use strict'
const svgCaptcha = require('svg-captcha');
const sendEmail = require('./sendEmail')
let captchaCode = ''
let emailCode = ''

// 验证邮箱唯一
module.exports.validate =function* (ctx){
    let data = {
        username: ctx.query.username
    }
    let result = yield ctx.model.User.find(data);
    if(result.length > 0) {
        ctx.body = {
            status: 1,
            message: '邮箱不可被注册'
        }
    }else {
        ctx.body = {
            status:0,
            message: '邮箱可被注册'
        }
    }
}
// 图片验证码
module.exports.getcode = (ctx) => {
    const options = {
        width: 100,
        height: 40, // height of captcha
        fontSize: 50, // captcha text size
        color: true,
        noise: 2,
    }
    const Captcha = svgCaptcha.createMathExpr(options);
    captchaCode = Captcha.text
    ctx.body = {
        status: 0,
        message: 'success',
        data: Captcha.data
    }
};
//图片验证码验证
module.exports.verify_code = (ctx) => {
    let code = ctx.query.code
    if (captchaCode === code) {
        ctx.body = {
            status: 0,
            message: 'success'
        }
    } else {
        ctx.body = {
            status: 1,
            message: '验证码错误'
        }
    }
};
// 获取邮箱验证
module.exports.getemail = (ctx) => {
    let username = ctx.query.username
    // 生成6位数验证码
    emailCode = ''
    for (let i = 0; i < 6; i++) {
        emailCode += Math.floor(Math.random() * 10).toString()
    }
    let email = {
        title: 'Blog个人网站--邮箱验证码',
        htmlBody: '<h1>Hello!</h1><p style="font-size: 18px;color:#000;">验证码为：<u style="font-size: 16px;color:#1890ff;">'+ emailCode +'</u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p>>'
    }
    let mailOptions = {
        from: 'www.dubo1994.com<microcosm@dubo1994.com>', // sender address mailfrom must be same with the user
        to: username, // list of receivers
        subject: email.title, // Subject line
        html: email.htmlBody // plaintext body
    };
    sendEmail.send(mailOptions)
    ctx.body = {
        status: 0,
        message: '邮件发送成功'
    }
}
// 邮箱验证码验证
module.exports.verify_email = (ctx) => {
    let code = ctx.query.code
    if (code === emailCode) {
        ctx.body = {
            status: 0,
            message: '邮箱验证成功'
        }
    }else{
        ctx.body = {
            status: 1,
            message: '邮箱验证码错误'
        }
    }
}
// 注册账号
module.exports.register = (ctx) => {
    let body = ctx.request.body
    let result = ctx.model.User.create(body);
    ctx.body = {
        status: 0,
        message: '注册成功',
        data: result
    }
};

exports.show = async () => {
};

exports.edit = async () => {
};

exports.update = async () => {
};

exports.destroy = async () => {
};
// module.exports = BlogController
