'use strict'
const svgCaptcha = require('svg-captcha');
const sendEmail = require('./sendEmail')
const Crypto = require('crypto')
const jwt = require('jsonwebtoken');
const ms = require('ms')
const fs = require('fs')
const path = require('path')
const Invite = 'microcosm'

// 验证邮箱唯一
module.exports.validate = function* (ctx) {
    let data = {
        username: ctx.query.username
    }
    let result = yield ctx.model.User.find(data);
    if (result.length > 0) {
        ctx.body = {
            status: 1,
            message: '邮箱不可被注册'
        }
    } else {
        ctx.body = {
            status: 0,
            message: '邮箱可被注册'
        }
    }
}
// 获取图片验证码
module.exports.getcode = (ctx) => {
    const options = {
        width: 100,
        height: 40, // height of captcha
        fontSize: 50, // captcha text size
        color: true,
        noise: 2,
    }
    const Captcha = svgCaptcha.createMathExpr(options);
    const {type, t} = ctx.query
    // 登陆验证码
    if (type === '1') {
        ctx.session.login_code = Captcha.text
    } else {
        // 注册验证码
        ctx.session.register_code = Captcha.text
    }
    // 设置session过期时间
    ctx.session.maxAge = 1000 * 60 * 10
    ctx.body = {
        status: 0,
        message: 'success',
        data: Captcha.data
    }
};
//图片验证码验证
module.exports.verify_code = (ctx) => {
    const {type, code} = ctx.query
    const {login_code, register_code} = ctx.session
    let result_success = {status: 0, message: 'success'}
    let result_error = {status: 1, message: '验证码错误'}
    // 登陆验证码验证
    if (type === '1') {
        ctx.body = code === login_code ? result_success : result_error
    } else {
        // 注册验证码验证
        ctx.body = code === register_code ? result_success : result_error
    }
}
// 获取邮箱验证
module.exports.getemail = (ctx) => {
    const {type, username} = ctx.query
    // 生成6位数验证码
    let emailCode = ''
    for (let i = 0; i < 6; i++) {
        emailCode += Math.floor(Math.random() * 10).toString()
    }
    // 注册邮箱验证码
    if (type === '1') {
        ctx.session.register_email = emailCode
    } else {
        // 找回密码验证码
        ctx.session.find_email = emailCode
    }
    // 设置session过期时间
    ctx.session.maxAge = 1000 * 60 * 10
    let email = {
        title: 'Blog个人网站--邮箱验证码',
        htmlBody: '<h1>Hello!</h1><p style="font-size: 18px;color:#000;">验证码为：<u style="font-size: 16px;color:#1890ff;">' + emailCode + '</u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p>>'
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
    const {type, code} = ctx.query
    const {register_email, find_email} = ctx.session
    let result_success = {status: 0, message: 'success'}
    let result_error = {status: 1, message: '验证码错误'}
    // 注册邮箱验证码验证
    if (type === '1') {
        ctx.body = code === register_email ? result_success : result_error
    } else {
        // 找回密码邮箱验证码验证
        ctx.body = code === find_email ? result_success : result_error
    }
}
// 注册账号
module.exports.register = function* (ctx) {
    let form = ctx.request.body
    let hexInvite = md5(Invite)
    // 对密码进行二次加密
    form.password = sha256(form.password, form.username)
    if (hexInvite === form.invite) {
        let result = yield ctx.model.User.create(form);
        let data = {
            username: result.username,
            nickname: result.nickname,
            portrait: result.portrait,
            createTime: result.createTime,
            isAdmin: result.isAdmin,
            _id: result._id
        }
        ctx.body = {
            status: 0,
            message: '注册成功',
            data: data
        }
    } else {
        ctx.body = {
            status: 1,
            message: '邀请码错误'
        }
    }
};

// 登录账号
module.exports.login = function* (ctx) {
    const {app} = this
    const form = ctx.request.body
    let rember = form.checked
    let time = 3600 * 24 * 30
    let password = sha256(form.password, form.username)
    let users = yield ctx.model.User.find({username: form.username})
    let {username, portrait, _id} = users[0]
    if (users.length > 0){
        if (password === users[0].password) {
            if (rember) {
                let token = generateToken({_id: _id}, time)
                ctx.cookies.set('token', token,{
                    maxAge: time * 1000,
                    path: '/',
                    domain: 'localhost',
                    httpOnly: false,
                });
                app.redis.set(username, token)
            } else{
                time = 3600
                let token = generateToken({_id: _id}, time)
                ctx.cookies.set('token', token);
                app.redis.set(username, token)
            }
            ctx.body = {
                status: 0,
                message: '登录成功',
                data: {
                    username: username,
                    portrait: portrait,
                    _id: _id
                }
            }
        }else{
            ctx.body = {
                status: 1,
                message: '账号或密码输入错误'
            }
        }
    }else{
        ctx.body = {
            status: 1,
            message: '账号没有注册'
        }
    }
}

function timestampToTime(timestamp) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() + ' '
    let h = date.getHours() + ':'
    let m = date.getMinutes() + ':'
    let s = date.getSeconds()
    return Y + M + D + h + m + s;
}
// 加密方式
function md5(str) {
    const hash = Crypto.createHash('md5');
    hash.update(str)
    return hash.digest('hex')
}

function sha256(str, username) {
    const hmac = Crypto.createHmac('sha256', username);
    hmac.update(str)
    return hmac.digest('hex')
}
/**
*@filename:token
*@Description:
 * data:用户id
 * time:保存时间
*/
function  generateToken(data, time){
    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem'));//私钥
    let token = jwt.sign({
        data,
        exp: created + time
    }, cert, {algorithm: 'RS256'});
    return token;
}
// module.exports = BlogController
