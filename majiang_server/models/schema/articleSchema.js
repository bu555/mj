var mongoose = require('mongoose');
// 存评论
const commentSchema = new mongoose.Schema({
    aid:String,
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
            ] //别人回复的评论
        }
    ]
})
const comment = mongoose.model('a_comment', commentSchema) 

// 存内容
const contentSchema = new mongoose.Schema({
    aid:String,
    size:Number,
    content:String,  
    views:Number  
})
const content = mongoose.model('a_content', contentSchema) 

// 存文章主要信息
const articleSchema = new mongoose.Schema({
    uid:String,
    title:String, //
    category:String,  //ask share
    // content:String,
    tags:String, //标签 格式：'tag1,tag2...'
    c_time:Date, //创建时间
    good:Boolean, //加精
    like:[String],
    likes:Number,
    edit_time:Date, //编辑时间
    state:Number,  // 文章状态，1:待审核，2：已审核
    zan:[String],
    zans:Number,
    profile:String, 
    comment_count:Number, //评论总数
    comment_time:Date, //最后评论时间
    coverImage:String
})

const article = mongoose.model('a_article', articleSchema) 

const ArticleModel = {
    article:article,
    comment:comment,
    content:content
}
module.exports = ArticleModel 