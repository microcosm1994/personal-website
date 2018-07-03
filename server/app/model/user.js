'use strict'
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const UserSchema = new Schema({
        username: {
            type: String,
            unique: true
        },
        nickname: {
            type: String
        },
        password: {
            type: String
        },
        portrait: {
            type: String,
            default: 'http://eago.oss-cn-hongkong.aliyuncs.com/portrait/timg.jpg'
        },
        isAdmin: {
            type: Boolean
        },
        date: {
            type: Date
        }
    })
    return mongoose.model('User', UserSchema);
}