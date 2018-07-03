'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1530091135719_4647';

    // add your config here
    config.middleware = [];
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
        },
        domainWhiteList: ['http://localhost:3001']
    };
    config.cors = {
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };
    config.mongoose = {
        client: {
            url: 'mongodb://127.0.0.1:27017/blog',
            options: {},
        },
    };
    return config;
};
