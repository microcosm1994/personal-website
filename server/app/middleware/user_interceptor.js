const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
    return async function userInterceptor(ctx, next) {
        //获取token
        let token = ctx.cookies.get('token')
        // 获取前端或以其他方式设置的cookie需要设置signed: false属性，避免对它做验签导致获取不到 cookie 的值。
        let username = ctx.cookies.get('username', {signed: false})
        //验证token是否为空
        if (token){
            let result = verifyToken(token)
            let {_id} = result
            //验证客户端token是否合法
            if (_id) {
                let redis_token = await app.redis.get(username)
                //验证是否为最新的token
                if (token === redis_token) {
                    await next();
                }else{
                    // 如果不是最新token，则代表用户在另一个机器上进行操作，需要用户重新登录保存最新token
                    ctx.body = {
                        status: 1,
                        message: 'token过期'
                    }
                }
            }else{
                // 如果token不合法，则代表客户端token已经过期或者不合法（伪造token）
                ctx.body = {
                    status: 1,
                    message: 'token不合法'
                }
            }
        }else{
            // 如果token为空，则代表客户没有登录
            ctx.body = {
                status: 1,
                message: 'token为空'
            }
        }
    };
}

function verifyToken(token) {
    let cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem'));//公钥
    let res = ''
    try {
        let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
        let {exp, iat} = result, current = Math.floor(Date.now() / 1000);
        if (current <= exp) {
            res = result.data || {};
        }
    } catch (e) {
        console.log(e);
    }
    return res;
}

function timestampToTime(timestamp) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() + ' '
    let h = date.getHours() + ':'
    let m = date.getMinutes() + ':'
    let s = date.getSeconds()
    return Y + M + D + h + m + s;
}