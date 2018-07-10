'use strict';

module.exports = app => {
    require('./router/blog')(app);
    require('./router/users')(app);
};