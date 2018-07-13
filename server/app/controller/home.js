'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        console.log(1);
        this.ctx.body = {staus: 0, message: 'qingasdkj'};
    }
    async hello () {
        console.log(2);
        this.ctx.body = {staus: 0, message: 'qingasdkj'}
    }

}

module.exports = HomeController;
