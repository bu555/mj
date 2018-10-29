
const CommentModel = require('../models/schema/comment') 
const User = require('./user') 
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')


class Comment {
    constructor(){

    }
    getComment(options){ //{eid:string}
        let eid = options.eid
        return new Promise((resolve,reject)=>{
            CommentModel.findOne({eid:eid}).then(comment=>{
                if(comment){
                        (async ()=>{
                            try{
                                for(let i=0;i<comment.list.length;i++){
                                    let user = await User.getUser({uid:comment.list[i].uid})
                                    comment.list[i].role_name = user.role_name ||  '已注销'
                                }
                                resolve(comment.list)
                            }catch(error){
                                reject(error)
                            }
                        })()
                }else{
                    reject('eid not find')
                }
            })

        })
    }
    // 创建评论
    createComment(options){  //{eid:string}
        return new Promise((resolve,reject)=>{
            let commentAdd = new CommentModel({
                eid:options.eid,
                list:[]
            })
            commentAdd.create_time = moment(objectIdToTimestamp(commentAdd._id)).format('YYYY-MM-DD HH:mm:ss')
            commentAdd.save((err, example) => {
                if (!err) {
                    resolve('success')
                } else {
                    reject('save error')
                }
            })
            
        })
    }
    // 添加评论
    addComment(options){ //{eid:string,uid:string,result:'评论内容'}
        return new Promise((resolve,reject)=>{
            CommentModel.findOne({eid:options.eid}).then(comment=>{
                if(comment){
                    CommentModel.update({eid:options.eid},{$push: {list:{
                                // cid:myUtill.randomString(15), //15位字符串
                                uid:options.uid,
                                result:options.result,
                                c_time:moment().utc().format(),
                                zan:[],
                                reply:[]
                            }} },err=>{
                                if(!err){
                                    resolve('success')
                                }else{
                                    reject('error,save fail');
                                }
                            })

                }else{
                    reject('eid not find')
                }
            })
        })
    }
    addZan(options){  //{eid:'',uid:'',cid:}
        return new Promise((resolve,reject)=>{
            CommentModel.findOne({eid:options.eid}).then(comment=>{
                    if(comment){
                        for(let i=0;i<comment.list.zan;i++){
                                console.log(comment.list.zan[i].uid);
                            if(comment.list.zan[i].uid === options.uid){
                                reject('repeat')
                            }
                        }
                        CommentModel.update({"eid":options.eid},{"list._id":options.cid},{$push:{"list.$.zan":options.uid}},err=>{
                            resolve(err)
                        })
                        // comment.list.push(options)
                        // comment.zan.push(options.uid)
                    }else{
                        reject('eid or cid not find')
                    }
            })
            // CommentModel.findOne({eid:options.eid,"list._id":options.cid}).then(comment=>{
            //     if(comment){
            //         resolve(comment)
            //         // CommentModel.update({"eid":options.eid,"list.cid":options.cid,"list.cid":options.cid},{$set:{"list.$.result":"嘿嘿"}})
            //     }else{
            //         reject('eid not find')
            //     }
            // })
        })
    }
    // 修改评论
    modifyComment(options){ //{eid,cid,result}
        return new Promise((resolve,reject)=>{
            CommentModel.findOne({eid:options.eid}).then(comment=>{
                if(comment){
                    CommentModel.update({"eid":options.eid,"list.uid":options.uid,"list._id":options.cid},{$set:{"list.$.result":"嘿嘿"}},err=>{
                        if(!err){
                            resolve('modify success');
                        }
                    })
                }else{
                    reject('eid not find')
                }

            })
        })
    }  
    // 删除评论
    deleteComment(options){ //{eid,cid,uid}
        return new Promise((resolve,reject)=>{
            CommentModel.findOne({eid:options.eid}).then(comment=>{
                if(comment){
                    CommentModel.update({"eid":options.eid},{$pull:{list:{uid:options.uid,cid:options.cid}}},err=>{
                        if(!err){
                            resolve('delete success');
                        }
                    })
                }else{
                    reject('eid not find')
                }

            })
        })
    }  
}




module.exports = new Comment