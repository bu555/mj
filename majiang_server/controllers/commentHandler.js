
const CommentModel = require('../models/schema/commentSchema')
const moment = require('moment')
const myUtill = require('../models/utill')
class Comment{
    constructor(){

    }
    // params: {eid:'',uid:'',result:''}
    addComment(options){
        return new Promise((resolve,reject)=>{
            CommentModel.findOne({eid:options.eid}).then(comment=>{
                if(comment){
                    comment.list.push({
                            uid:options.uid,
                            // cid:myUtill.randomString(15),
                            result:options.result,
                            c_time:moment().utc(),
                            zan:[],
                            reply:[],
                            // zaned:false,
                            zanCount:0
                    })
                    comment.save((err,comment)=>{
                        if(!err){
                            resolve(comment)
                        }else{
                            reject('The comment save is failed')
                        }
                    })

                }else{
                     reject('The eid find is failed')
                }
            })

        })
    }
    // params: {eid:''}
    getComment(options={}){
        return new Promise((resolve,reject)=>{
            let page = options.page && /^[1-9][0-9]*$/.test(options.page) ? Number(options.page): 1
            let size = options.size && /^[1-9][0-9]*$/.test(options.size) ? Number(options.size): 5
            CommentModel.findOne({eid:options.eid}).then(comment=>{
                if(comment){
                        resolve(comment)
                }else{
                     reject('The eid find is failed')
                }
            })

        })
    }

    // params : {eid:'',cid:',uid'}
    clickZan(options){
        return new Promise((resolve,reject)=>{
            CommentModel.findOne({eid:options.eid}).then(comment=>{
                if(comment){
                    let flag = false
                    let count
                    for(let i=0;i<comment.list.length;i++){
                        if(comment.list[i]._id==options.cid){
                            flag = true
                            if(comment.list[i].zan.indexOf(options.uid) !== -1){
                                comment.list[i].zan.splice(comment.list[i].zan.indexOf(options.uid),1)  //删除一个元素
                                count = comment.list[i].zan.length
                                comment.list[i].zanCount = count
                                break;
                            }else{
                                count = comment.list[i].zan.push(options.uid)
                                comment.list[i].zanCount = count
                                break;
                            }
                        }
                    }
                    if(!flag) return reject('The cid not find')
                    comment.save((err,comment)=>{
                        if(!err){
                            resolve(count)
                        }else{
                            reject('The comment save is failed')
                        }
                    })
                }else{
                    reject('The eid find is failed')
                }
            })
        })
    }
}

module.exports = new Comment()