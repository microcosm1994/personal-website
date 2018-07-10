'use strict'
const svgCaptcha = require('svg-captcha');

exports.index = function* (ctx) {
    ctx.body = yield ctx.model.User.find({});
}

module.exports.code = function* (ctx) {
    const options = {
        width: 100,
        height: 40, // height of captcha
        fontSize: 40 // captcha text size
    }
    let time = new Date()
    console.log(ctx.query.t);
    console.log(time.getTime());
    const Captcha = svgCaptcha.createMathExpr(options);
    ctx.body = Captcha
};
// 注册账号
module.exports.create = function* (ctx) {
    let result = {
        status: 0,
        message: '保存成功'
    }
    let body = ctx.request.body
    let data = yield ctx.model.User.create(body);
    ctx.body = result
};

exports.show = async () => {};

exports.edit = async () => {};

exports.update = async () => {};

exports.destroy = async () => {};
// module.exports = BlogController
