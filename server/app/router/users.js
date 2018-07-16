'use strict'
module.exports = app => {
    const { router, controller } = app;
    const UserInterceptor = app.middleware.userInterceptor({}, app);
    router.get('/users/getcode', UserInterceptor, controller.users.getcode);
    router.get('/users/getemail', controller.users.getemail);
    router.get('/users/validate', controller.users.validate);
    router.get('/users/verify_code', controller.users.verify_code);
    router.get('/users/verify_email', controller.users.verify_email);
    router.post('/users/register', controller.users.register);
    router.post('/users/login', controller.users.login);
};
