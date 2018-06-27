'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hiq, egg';
    }
    async hello () {
        this.ctx.body = 'hiq, eggaaaa';
    }

}

module.exports = HomeController;
