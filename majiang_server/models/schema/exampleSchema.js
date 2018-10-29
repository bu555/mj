const mongoose = require('mongoose')
const exampleSchema = new mongoose.Schema({
    name: String,
    name1: String, // 副名称 区分同名
    create_time: Date,
    update_time: Date,
    info:String,
    img_url:String,
    type: String,
    total: Number, //参与投票人数    
    like:[String],
    likes:Number,
    tag: String, //标签
    birth: String,
    conste: String, //星座
    vote: {
        entp:Number,
        intp:Number,
        entj:Number,
        intj:Number,
        enfp:Number,
        infp:Number,
        enfj:Number,
        infj:Number,
        estj:Number,
        istj:Number,
        esfj:Number,
        isfj:Number,
        estp:Number,
        istp:Number,
        esfp:Number,
        isfp:Number  
    },
    vote_log:[String],
    create_by:String,
})
const commentSchema = new mongoose.Schema({
        eid:String,
        title:String,
        comment:[
            {
                uid:String,
                cid:String,
                content:String,
                c_time:Date,
                zan:[String], //[uid,uid]
                zans:Number,
                replay:[
                    {
                        uid:String,
                        content:String,
                        c_time:Date
                    }
                ] 
            }
        ]
})
const example = mongoose.model('e_example', exampleSchema) 
const comment = mongoose.model('e_comment', commentSchema) 
const ExampleModel = {
    example:example,
    comment:comment
}
module.exports = ExampleModel