
const AccountModel = require('../models/schema/accountSchema') 
class Account {
    constructor(){
    }
    // 创建一个用户信息model  
    // options:{uid:''}
    static addAccountInfo(options={}){
        return new Promise((resolve,reject)=>{
            new AccountModel.info({
                uid:options.uid,
                name:options.name,
                // r_name:'ABCDEFGHIJ'.charAt(Math.floor(Math.random()*10)) + String(Math.random()).substr(9),
                // avatar:'', //头像
                // profile:'', //简介
                // sex:"-1",
                // city:'',
                // birth:'', //
                // 参与测试结果
                // t_result:Array, //{mbti:{res:'intj',date:'string'},keirsey:{res:'NT',date:‘string’},function}
                // 关注的用户
                followers:[], //['uid','uid']
                // 被关注
                following:[], //['uid','uid']
                // 好友
                friends:[], //['uid','uid']
                // 喜欢文章
                likes_atricle:[], //['aid','aid']
                my_article:[], //发表的文章
                my_comment:[],
                // 关注de人物
                likes_example:[], //['eid','eid']
            }).save((err,i)=>{
                if(!err){
                    resolve(i)
                }
            })
        })
    }
    // 已发表文章记录 options;{uid:'',aid:''}
    static addPublishLog(options={}){
        return new Promise((resolve,reject)=>{
            AccountModel.info.update({uid:options.uid},{$addToSet:{my_article:options.aid}},err=>{
                if(err) return reject('Update error')
                resolve('Update success!')
            }) 
        })
    }
    // 删除已发表文章记录 options;{uid:'',aid:''}
    static deletePublishLog(options={}){
        return new Promise((resolve,reject)=>{
            AccountModel.info.update({"uid":options.uid},{"$pull":{"my_article":options.aid}},err=>{
                if(err) return reject('Update error')
                resolve('Update success!')
            }) 
        })
    }
    // 更新个人喜欢文章记录 options:{aid:'',uid:'',offset:1/-1}
    static clickLikeArticleLog(options={}){
        return new Promise((resolve,reject)=>{
            if(options.offset===1){
                AccountModel.info.update({uid:options.uid},{$push:{likes_atricle:options.aid}},err=>{
                    if(err) return reject('Update error')
                    resolve('Update success!')
                }) 
            }else if(options.offset===-1){
                AccountModel.info.update({uid:options.uid},{$pull:{likes_atricle:options.aid}},err=>{
                    if(err) return reject('Update error')
                    resolve('Update success!')
                }) 
            }else {
                reject('Params "offset" error')
            }
        })
    }
    // 更新个人喜欢example记录 options:{eid:'',uid:'',offset:1/-1}
    static clickLikeExampleLog(options={}){
        return new Promise((resolve,reject)=>{
            if(options.offset===1){
                AccountModel.info.update({uid:options.uid},{$push:{likes_example:options.eid}},err=>{
                    if(err) return reject('Update error')
                    resolve('Update success!')
                }) 
            }else if(options.offset===-1){
                AccountModel.info.update({uid:options.uid},{$pull:{likes_example:options.eid}},err=>{
                    if(err) return reject('Update error')
                    resolve('Update success!')
                }) 
            }else {
                reject('Params "offset" error')
            }
        })
    }
    // 个人评论记录 options:{aid:''/或eid:'',cid:'',uid:''}
    static addCommentLog(options={}){
        return new Promise((resolve,reject)=>{
            AccountModel.info.update({uid:options.uid},{$push:{my_comment:{
                eid:options.eid || "",
                aid:options.aid || "",
                cid:options.cid
            }}},err=>{
                if(err) return reject('Log add faild!')
                resolve('success')
            })
        })
    }
    // 个人投票记录 options:{uid:'',eid:'' result:''}
    static addVoteLog(options={}){
        return new Promise((resolve,reject)=>{
            AccountModel.info.update({uid:options.uid},{$addToSet:{vote_example:{
                eid:options.eid,
                result:options.result,
                c_time:new Date()
            }}},err=>{
                if(err) return reject(err)
                resolve('success')
            })
        })
    }
    // uid查询用户 {uid:''}
    static getUserInfoById(options={}){
        return new Promise((resolve,reject)=>{
            AccountModel.info.findOne({"uid":options.uid},"-name").then(acc=>{
                if(acc){
                    resolve(acc)
                }else{
                    resolve(null)
                }
            }).catch((err)=>{
                reject('The seach error')
            })
        })
    }
    // 关注/取消关注用户 options:{uid:'',uuid:''}
    static followUser(options={}){
        return new Promise((resolve,reject)=>{
                AccountModel.info.findOne({"uid":options.uuid}).then(user=>{
                    if(user){
                        // 如果对方粉丝没有该用户
                        if(user.following.indexOf(options.uid)===-1){
                            AccountModel.info.update({"uid":options.uid},{$addToSet:{followers:options.uuid}},err=>{
                                if(err) return reject('followers $push falid')
                                AccountModel.info.update({"uid":options.uuid},{$addToSet:{following:options.uid}},err=>{
                                    if(err) return reject('following $push falid')
                                    resolve({
                                        info:'关注成功！',
                                        count:1
                                    })
                                })
                            })

                        }else{  //已经关注
                            AccountModel.info.update({"uid":options.uid},{$pull:{followers:options.uuid}},err=>{
                                if(err) return reject('followers $pull falid')
                                AccountModel.info.update({"uid":options.uuid},{$pull:{following:options.uid}},err=>{
                                    if(err) return reject('following $pull falid')
                                    resolve({
                                        info:'已取消关注！',
                                        count:-1
                                    })
                                })
                            })

                        }

                    }else{
                        reject('The uuid not find')
                    }
                })

        })
    }
    // 修改用户资料
    // static modifyInfo(options={}){
    //     return new Promise((resolve,reject)=>{
    //         AccountModel.info.update({"uid":options.uid},{$set:{
    //                 r_name:options.r_name || '',
    //                 profile:options.profile || '', //简介
    //                 sex:options.sex || '',
    //                 city:options.city || '-1',
    //                 birth:options.birth || '', 
    //         }},err=>{
    //             if(err) return reject('modify faild')
    //             resolve('modify success')
    //         })

    //     })
    // }
    // 用户测试记录
    static addTestRecord(options={}){
        return new Promise((resolve,reject)=>{
            AccountModel.info.update({"uid":options.uid},{$addToSet:{"test_record":options.tid }},err=>{
                if(err) return reject('The tid $addToSet faild')
                resolve('success')
            })

        })
    }
    // 用户删除测试记录 {uid:'',tid:''}
    static deleteTestRecord(options={}){
        return new Promise((resolve,reject)=>{
            AccountModel.info.findOne({"uid":options.uid}).then(a=>{
                if(a && a.test_record.indexOf(options.tid)>-1){
                    AccountModel.info.update({"uid":options.uid},{$pull:{"test_record":options.tid }},err=>{
                        if(err) return reject('The tid $pull faild')
                        resolve('success')
                    })
                }else{
                    reject()
                }
            })

        })
    }
     


}

module.exports = Account