const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接失败！connection error:'));
db.once('open', function() {
  console.log('连接成功！connect success')
});

const exampleSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    create_time: Date,
    info:String,
    img_url:String,
    type: String,
    total: Number, //参与人数
    tag: String,
    birth: String,
    conste: String, //星座
    vote: Object,  // {intj:0,enfp:1 ...}
})

// Model模型，是经过Schema构造来的，除了Schema定义的数据库骨架以外，还具有数据库行为模型，他相当于管理数据库属性、行为的类
const Example = module.exports = mongoose.model('ExampleBody', exampleSchema) 