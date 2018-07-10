'use strict'
module.exports = app => {
    const { router, controller } = app;
    router.get('/users/code', controller.users.code);
};
