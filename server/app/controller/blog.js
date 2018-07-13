'use strict'

exports.index = function* (ctx) {
    ctx.body = yield ctx.model.User.find({});
}

exports.new = async () => {};
// 保存博客
module.exports.create = (ctx) => {
    let result = {
        status: 0,
        message: '保存成功'
    }
    let body = ctx.request.body
    let data = ctx.model.Blog.create(body);
    ctx.body = result
};

exports.show = async () => {};

exports.edit = async () => {};

exports.update = async () => {};

exports.destroy = async () => {};
// module.exports = BlogController
