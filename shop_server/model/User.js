const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

userSchema.pre('save', function (next) {
    // 随机生成salt   10迭代次数
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash;
            next();
        })
    });
});

userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            // console.log(_password, password);
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
};

// 发布模型
mongoose.model('User', userSchema);