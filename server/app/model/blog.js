'use scrict'
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const BlogSchema = new Schema({
        title: { type: String  },
        type: { type: String  },
        tags: { type: Array },
        content: { type: String },
        date: { type: Date },
        users: {
            username: {
                type: String
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
        }
    });

    return mongoose.model('Blog', BlogSchema);
}