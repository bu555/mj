const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
            eid:String,
            name:String,
            list:[
                {
                    uid:String,
                    result:String,
                    c_time:Date,
                    zan:Array,   //['uid1','uid2']
                    reply:[
                        {
                            uid:String,
                            res:String,
                            c_time:Date
                        }
                    ],
                    // zaned:Boolean,
                    zanCount:Number
                }

            ]
})

const CommentModel = mongoose.model('comment', commentSchema) 
module.exports = CommentModel