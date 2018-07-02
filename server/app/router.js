'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/save', controller.home.hello);
  router.get('/aa', controller.home.index);
};