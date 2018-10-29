var mongoose = require('mongoose');
//个人信息
const testSchema = new mongoose.Schema({
    // tid:{type:String,required:true},
    // category:{type:String,required:true,enum:['mbti','func','keirsey']},
    category:{type:String,required:true},
    type:String,
    uip:String,
    sex:String, //'0','1'
    age:Number,
    // guests:String, //游客
    c_time:Date,
    res:Object
    // mbti:{
    //     e:Number,
    //     i:Number,
    //     s:Number,
    //     n:Number,
    //     t:Number,
    //     f:Number,
    //     j:Number,
    //     p:Number
    // }

})
const testModel = mongoose.model('t_test', testSchema) 

module.exports = testModel