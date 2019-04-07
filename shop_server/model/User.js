const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 引入 schema
const glob = require('glob');
const path = require('path');
exports.initSchemas = () => {
    glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require);
};

const userSchema = new Schema({
    userId: Schema.Types.ObjectId,
    userName: { unique: true, type: String },//unique为true的时候 username唯一，type指定类型
    password: String,//因为没有其他的要求所以只写一个string就可以了
    createDate: { type: Date, default: Date.now() }
});



// 发布模型
mongoose.model('User', userSchema);