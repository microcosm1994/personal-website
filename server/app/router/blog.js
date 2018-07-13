'use strict'
module.exports = app => {
    const { router, controller } = app;
    router.post('/blog', controller.blog.create);
};
