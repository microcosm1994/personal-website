'use strict'
module.exports = app => {
    const { router, controller } = app;
    router.resources('blog','/blog', controller.blog);
};
