'use strict'
const Controller = require('egg').Controller;

class BlogController extends Controller {
    // get
    async index() {
        const {ctx} = this
        ctx.body = {
            status: 0,
            message: 'index'
        }
    }
    async new() {
        const {ctx} = this
        ctx.body = {
            status: 0,
            message: 'new'
        }
    }
    // 保存博客
    // async create() {
    //     const {ctx} = this
    //     let result = {
    //         status: 0,
    //         message: '保存成功'
    //     }
    //     let body = ctx.request.body
    //     ctx.model.User.create(body, (err, data) => {
    //         if (err) throw err
    //         if (!data.code) {
    //             ctx.body = result
    //         } else {
    //             result = {
    //                 status: 1,
    //                 message: '服务器错误'
    //             }
    //             ctx.body = result
    //         }
    //     })
    //     ctx.body = result
    // }
    async show() {
        const {ctx} = this
        ctx.body = {
            status: 0,
            message: 'show'
        }
    }
    async edit() {
        const {ctx} = this
        ctx.body = {
            status: 0,
            message: 'edit'
        }
    }
    async update() {
        const {ctx} = this
        ctx.body = {
            status: 0,
            message: 'update'
        }
    }
    async destroy() {
        const {ctx} = this
        ctx.body = {
            status: 0,
            message: 'destroy'
        }
    }
}

exports.index = function* (ctx) {
    ctx.body = yield ctx.model.User.find({});
}

exports.new = async () => {};

module.exports.create = function* (ctx) {
    let result = {
        status: 0,
        message: '保存成功'
    }
    let body = ctx.request.body
    let data = yield ctx.model.Blog.create(body);
    ctx.body = result
};

exports.show = async () => {};

exports.edit = async () => {};

exports.update = async () => {};

exports.destroy = async () => {};
// module.exports = BlogController
