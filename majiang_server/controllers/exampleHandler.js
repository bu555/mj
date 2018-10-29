
const ExampleModel = require('../models/schema/exampleSchema')
const CommentModel = require('../models/schema/commentSchema')
const moment = require('moment')
const myUtill = require('../models/utill')
const GrabWeb = require('../controllers/grabWeb')
let cache = {
    maxAge:1000
}
class Example{
    constructor(){

    }
    // 创建名人例 {name:'',name1:'',url:'baikeURL',info:'',sName:''}
    createExample(options){
        return new Promise((resolve,reject)=>{
            // ExampleModel.example.find({name:options.name}).then(example=>{
            //     if(example){
            //         // 查出所有比对
            //         example.forEach((v,i)=>{
            //             if(v.name1==options.name1 || v.info.substr(0,20)==options.info.substr(0,20)){
            //                 return resolve(null)
            //             }
            //         })

            //     }
                // 下载图片到本地 -> 保存资料
                GrabWeb.downloadNetworkImage({imgURL:options.imgURL,type:'example'}).then(imgURL=>{
                    let vote = {
                            entp:0,
                            intp:0,
                            entj:0,
                            intj:0,
                            enfp:0,
                            infp:0,
                            enfj:0,
                            infj:0,
                            estj:0,
                            istj:0,
                            esfj:0,
                            isfj:0,
                            estp:0,
                            istp:0,
                            esfp:0,
                            isfp:0
                        }
                    let exampleAdd = new ExampleModel.example({
                        name: options.name,
                        name1: options.name1,
                        type: "****",
                        vote: vote,
                        info: options.info || '',
                        img_url: imgURL,
                        total: 0, 
                        tag: options.tag || '',
                        birth: options.birth || '',
                        conste: options.conste || '', //星座
                        create_time: new Date(),
                        update_time: new Date(),
                        like:[],
                        likes:0,
                        create_by:options.uid || ''
                    })
                    exampleAdd.save((err, example) => {
                        if(err) {
                            resolve(null)
                        } else {
                            new ExampleModel.comment({
                                eid:example._id,
                                comment:[],
                                title:exampleAdd.name
                            }).save((err,comment)=>{
                                if(err) return resolve(null)
                                resolve(example)
                            })
                        }
                    })
                })


            })
        // })
    }
    // params : {name:'',type:'',page:'',size:''}
    searchExample(options={}){
        return new Promise((resolve,reject)=>{
            // let page = options.page && /^[1-9][0-9]*$/.test(options.page) ? Number(options.page): 1
            // let size = options.size && /^[1-9][0-9]*$/.test(options.size) ? Number(options.size): 5
            let pro;
            // 1.按name 模糊查询
            if(options.name){
                if(options.strict){ //严格搜索
                    pro = ExampleModel.example.findOne({ name:new RegExp('^'+options.name+'$','') },"-like");
                }else{
                    pro = ExampleModel.example.find({ name:new RegExp(options.name,'i') },"-like");
                }
            // 2.按type 模糊查询
            }else if(options.type){
                pro = ExampleModel.example.find({ type:new RegExp(options.type,'i') },"-like");
            // 3.查找所有
            }else{
                pro = ExampleModel.example.find({},"-like");
                // return reject('params error')

            }

            // query.where({age:30});
            // query.sort({ name: 'asc', age: -1 });
            // //query.and({_id:"123456222"});
            // query.or([{_id:"123456fff222"},{_id:"123456222"}]);
            // //query.limit(3); //限制条数
            // //query.skip(3)   //开始数 ，通过计算可是实现分页
            // //query.friends('name')
            // query.exec(function(err,docs){
            //     console.log(docs);
            // })
            // pro.limit(size).skip((page-1)*size).then(example=>{
            pro.then(example=>{
                if(example){
                    if( !(example instanceof Array) ){  //严格搜索结果：返对象
                        example = [example]
                    }
                    resolve(example)
                }else{
                    resolve([])
                }
                
            }).catch(err=>{
                reject('error')
            })
        })
    }
    // params : {eid:'',uid:'可选'}
    getExampleById(options={}){
        return new Promise((resolve,reject)=>{
            if(!options.eid) return reject('The params error')
            ExampleModel.example.findById(options.eid,(err,example)=>{
                if(!err){
                    if(example){
                        example = JSON.parse(JSON.stringify(example))
                        example.isVoted = false
                        example.isLiked = false
                        if(options.uid){  //已登录
                            // 判断是否透过票
                            example.isVoted = example.vote_log.indexOf(options.uid)>-1?true:false
                            // 判断是否喜欢
                            example.isLiked = example.like.indexOf(options.uid)>-1?true:false
                        }
                        delete example.vote_log
                        delete example.like
                        resolve(example)
                    }
                }else{
                    reject(err)
                }
            })

        })
    }
    // 去重判断
    exampleHandle(options){
        if(options.uid){  //已登录
            for(let i=0;i<example.vote_log.length;i++){
                if(example.vote_log[i].uid === options.uid){
                    example.voted = true
                    return resolve(example)
                }
                example.voted = false
                resolve(example)
            }
        }else{ //未登录
            example.voted = false
            resolve(example)
        }

    }
    // 投票params : {eid:string,uid:string,result:'intj'}
    addVote(options){
        return new Promise((resolve,reject)=>{
            ExampleModel.example.findById(options.eid,(err,example)=>{
                if(!err){
                    if(example){
                        //验证是否重复
                        // for(let i=0;i<example.vote_log.length;i++){
                        //     if(example.vote_log[i].uid === options.uid){
                        //         return reject('Unable to repeat the vote')
                        //     }
                        // }
                        if(example.vote_log.indexOf(options.uid)>-1) return reject('Unable to repeat the vote')
                        // 更新type 、vote 、vote_log
                        if(example.type!=="****"){
                            if(Object.keys(example.vote).indexOf(options.result)!=-1){
                                if(example.type!==options.result && example.vote[options.result]+1 > example.vote[example.type]){
                                    example.type=options.result 
                                } 
                            }else{
                                return reject('The params error')
                            }
                        }else{
                            example.type = options.result
                        }
                        example.vote[options.result] = example.vote[options.result]+1
                        example.vote_log.push(options.uid)
                        example.total = example.vote_log.length
                        example.update_time = new Date()
                        // type 、vote 、vote_log 验证 一致性（临时）
                        // let tempObj = {}
                        // example.vote_log.forEach((v,i)=>{
                        //     tempObj[v.result] ? tempObj[v.result]=tempObj[v.result]+1 : tempObj[v.result]=1
                        // })
                        example.save((err,example)=>{
                            if(!err){
                                resolve(example)
                            }else{
                                reject(err)
                            }
                        })
                        

                    }
                }
            })
        })
    }
    // 评论params: {eid:'',uid:'',result:'',cid:'回复别人'}
    addComment(options){
        return new Promise((resolve,reject)=>{

            // 带有cid为回复用户
            if(options.cid){
                ExampleModel.comment.findOne({eid:options.eid}).then(e=>{
                    if(e){
                        let replay = {
                            uid:options.uid,
                            content:options.content,
                            c_time:new Date()
                        }
                        ExampleModel.comment.update({"eid":options.eid,"comment.cid":options.cid},{$addToSet:{"comment.$.replay":replay} },(err,r)=>{
                            if(err) return reject('Update error!')
                            return resolve({
                                status:'replay'
                            })
                        })

                    }else{
                        reject('The find eid result is empty ')
                    }
                })
            }else{

                ExampleModel.comment.findOne({eid:options.eid}).then(e=>{
                    let cid = myUtill.randomString(7)
                    ExampleModel.comment.update({"eid":options.eid},{$addToSet:{comment:{
                            uid:options.uid,
                            cid:cid,
                            content:options.content,
                            c_time:new Date(),
                            zan:[], //[uid,uid]
                            zans:0,
                            replay:[]
                    }}},err=>{
                        if(err) reject(err)
                        resolve({
                            cid:cid,
                            status:'new'
                        })
                    })
                })
            }


        })
    }
    // 获取文章的评论params: {eid:''}
    getComment(options={}){
        return new Promise((resolve,reject)=>{
            let page = options.page && /^[1-9][0-9]*$/.test(options.page) ? Number(options.page): 1
            let size = options.size && /^[1-9][0-9]*$/.test(options.size) ? Number(options.size): 5
            ExampleModel.comment.findOne({"eid":options.eid}).then(c=>{
                if(c){
                        resolve(c.comment)
                }else{
                     reject('The eid find is failed')
                }
            })

        })
    }

    // 评论点赞params : {eid:'',cid:''}
    clickCommentZan(options){
        return new Promise((resolve,reject)=>{
            ExampleModel.comment.findOne({"eid":options.eid}).then(e=>{
                if(e){
                    let exist_cid = false
                    for(let i=0;i<e.comment.length;i++){
                        if(e.comment[i].cid === options.cid){
                                exist_cid = true
                                if(e.comment[i].zan.indexOf(options.uid)===-1){
                                    ExampleModel.comment.update({"eid":options.eid,"comment.cid":options.cid},{$push:{"comment.$.zan":options.uid},$inc:{"comment.$.zans":1}},(err,r)=>{
                                        if(err) return reject('Update error!')
                                        return resolve({
                                            info:'Comment赞+1',
                                            count:1
                                        })
                                    })
                                }else{
                                    ExampleModel.comment.update({"eid":options.eid,"comment.cid":options.cid},{$pull:{"comment.$.zan":options.uid},$inc:{"comment.$.zans":-1}},(err,r)=>{
                                        if(err) return reject('Update error!')
                                        return resolve({
                                            count:-1,
                                            info:'Comment取消点赞'
                                        })
                                    })
                                
                                }
                        }
                    }
                    if(!exist_cid){
                        reject('The cid not find!')
                    }
                    // ArticleModel.article.update({"_id":options.aid,"comment._id":options.cid},{$addToSet:{"comment.$.zan":options.uid}},(err,r)=>{
                    //     if(err) return reject('Update error!')
                    //     // { n: 1, nModified: 0, ok: 1 }  未添加
                    //     // { n: 1, nModified: 1, ok: 1 }  已添加
                    //     if(r.nModified===1){
                    //         resolve({
                    //             info:'Comment赞+1',
                    //             count:1
                    //         })
                    //     }else{
                    //         ArticleModel.article.update({"_id":options.aid,"comment._id":options.cid},{$pull:{"comment.$.zan":options.uid}},(err,r)=>{
                    //             if(r.nModified===1){
                    //                 resolve({
                    //                     count:-1,
                    //                     info:'Comment取消点赞'
                    //                 })
                    //             }else{
                    //                 reject('$pull faild')
                    //             }
                    //         })
                    //     }
                    // })
                }else{
                    reject('The find cid result is empty ')
                }
            })
        })
    }
    // cid和eid查看评论options {eid:'必传',cid:[id1,id2,...]}
    getCommentByCid(options={}){
        return new Promise((resolve,reject)=>{
            ExampleModel.comment.findOne({"eid":options.eid}).then(c=>{
                    if(c){
                        let item = {eid:options.eid,  title:c.title||'暂空',  comment:[]}
                        for(let i=0;i<options.cid.length;i++){
                            for(let j=0;j<c.comment.length;j++){
                                if(options.cid[i]===c.comment[j].cid){
                                    c.comment[j].zan=null
                                    item.comment.push(c.comment[j])  
                                }
                            }
                        }
                        resolve(item)
                    }else{
                        resolve(null)
                    }
                }) 
            })
    }
    // 点击喜欢examole options:{eid:'',uid:''}
    clickExampleLike(options){
        return new Promise((resolve,reject)=>{
            ExampleModel.example.findOne({_id:options.eid}).then(e=>{
                if(e){
                    if(e.like.indexOf(options.uid)===-1){
                        ExampleModel.example.update({"_id":options.eid},{"$addToSet":{"like":options.uid},"$inc":{"likes":1}},(err,r)=>{
                            if(err) return reject("The like array $addToSet faild")
                                resolve({
                                    info:'example喜欢+1',
                                    count:1,
                                })
                        })
                    }else{
                        ExampleModel.example.update({"_id":options.eid},{"$pull":{"like":options.uid},"$inc":{"likes":-1}},(err,r)=>{
                            if(err) return reject("The like array $pull faild")
                                resolve({
                                    info:'example喜欢-1（取消喜欢成功）',
                                    count:-1,
                                })
                        })

                    }
                }else{
                    reject('Find aid faild!')
                }
            })
        })

    }
}


module.exports = new Example()