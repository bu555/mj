
const VoteModel = require('../models/schema/vote')  //存储投票记录
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')


class Vote {
    constructor(){

    }
    createVote(options){  //{eid:string}
        return new Promise((resolve,reject)=>{
            let voteAdd = new VoteModel({
                eid:options.eid,
                list:[],
            })
            voteAdd.create_time = moment(objectIdToTimestamp(voteAdd._id)).format('YYYY-MM-DD HH:mm:ss')
            voteAdd.save((err, example) => {
                if (!err) {
                    resolve('success')
                } else {
                    reject('save error')
                }
            })
            
        })
    }
    addVote(options){ //{eid:string,uid:string,result:'intj'}
        return new Promise((resolve,reject)=>{
            // 检验是否重复投票
            this.checkVote({
                uid:options.uid,
                eid:options.eid
            }).then(res=>{
                if(!res){ //如果未重复
                    VoteModel.update({eid:options.eid},{$push: {list:{
                        uid:options.uid,
                        result:options.result,
                        c_time:moment().utc().format()
                    }} },err=>{
                        if(!err){
                            resolve('success')
                        }else{
                            reject('error,save fail');
                        }
                    })
                }else{
                    reject('Repeat vote,fail!')
                }
            })
        })
    }  
    checkVote(options){ //{uid:string,eid:string}  true:重复 ,false:未重复
      return new Promise((resolve,reject)=>{
        VoteModel.findOne({eid:options.eid}).then(vote=>{
            if(vote){
                let flag = false
                for(let i=0;i<vote.list.length;i++){
                    if(vote.list[i].uid == options.uid){
                        flag = true
                        break
                    }
                }
                flag? resolve(true):resolve(false)
            }else{
                reject('error,eid not find')
            }
        })
     })
    }
}




module.exports = new Vote