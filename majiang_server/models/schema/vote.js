const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    eid:String,
    list:Array,
    create_time: Date,
    // list:[
    //     {
    //         uid:'',
    //         res:'',
    //         data:''
    //     }
    // ]
})

// Model模型，是经过Schema构造来的，除了Schema定义的数据库骨架以外，还具有数据库行为模型，他相当于管理数据库属性、行为的类
const Vote = module.exports = mongoose.model('Vote', voteSchema) 