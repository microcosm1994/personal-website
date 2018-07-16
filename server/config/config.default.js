'use strict';

module.exports = appInfo => {
    const config = exports = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1530091135719_4647';
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
    //cookie密钥
    config.keys = 'microcosm,microcosm1994'
    config.redis = {
        client: {
            port: 6379,          // Redis port
            host: '127.0.0.1',   // Redis host
            password: 'auth',
            db: 0,
        },
    }
    return config;
};
