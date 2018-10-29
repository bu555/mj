

const ArticleModel = require('../models/schema/articleSchema') 
const myUtill = require('../models/utill')
class Article {
    constructor(){
    }
    // 发表或编辑文章 options:{uid:'',title:'',category:'share',content:'',aid:'如有为编辑'}
    static publishArticle(options){
        return new Promise((resolve,reject)=>{
            if(options.aid){  //编辑
                if(options.tags &&typeof options.tags==="string"){
                    // 去重
                    options.tags = Array.from( new Set(options.tags.split(',')) )
                }
                let coverImage = getCoverImage(options.content)
                ArticleModel.article.findOne({"_id":options.aid}).then(a=>{
                    if(!a) return reject("The aid find failed")
                    if(a.uid!==options.uid) return reject("The uid not match!")
                    ArticleModel.article.update({"_id":options.aid},{$set:{"title":options.title,"coverImage":coverImage,"category":options.category,"edit_time":new Date(),"tags":options.tags ||'',state:1}},err=>{
                            if(err) return reject("The article $set faild")
                            ArticleModel.content.update({"aid":options.aid},{$set:{"content":options.content,"size":options.content.length}},err=>{
                                    if(err) return reject("The content $set faild")
                                    resolve(options.aid) //返回aid
                            })
                    })
                })
            }else{  //新增
                    // 创建文章主要信息
                    let _date = new Date()
                    let profile = options.content.replace(/<[^>]+>/g,"").replace(/[\s\r\n]|&nbsp;|&nbsp/g,"") //去除标签
                    profile = myUtill.splitStr(profile,365) //截取
                    
                    let coverImage = getCoverImage(options.content)
                    new ArticleModel.article({
                        uid:options.uid,
                        title:options.title, //ask share
                        category:options.category,
                        c_time:_date,
                        good:false,
                        tags:options.tags ||'',
                        like:[],
                        likes:0,
                        zan:[],
                        zans:0,
                        edit_time:_date,
                        state:1,
                        comment_count:0,
                        comment_time:_date,
                        profile: profile,
                        coverImage:coverImage||''
                    }).save((err,a)=>{
                        if(err) return reject('The article add failed')
                        options.aid = a._id
                        // 创建内容
                        new ArticleModel.content({
                            aid:options.aid,
                            content:options.content,
                            size:options.content.length
                        }).save((err,c)=>{
                            if(err) return reject('The content add failed')
                            // 创建评论
                            new ArticleModel.comment({
                                aid:options.aid,
                                comment:[],
                                title:options.title
                            }).save((err,c)=>{
                                if(err) return reject('The comment add failed')
                                resolve(options.aid) //返回aid
                            })
                        })
                    })
            }
        })
        function getCoverImage(content){
            let coverImage = ""
            content.replace(/<img[^>]*>/,function(str){
                str.replace(/src="[^"]*"/,function(str){
                    coverImage =  str.split('"')[1]
                })
            })
            return coverImage ? coverImage : ""

        }
    }
    // 删除文章(用户) options:{aid:''，uid:''}
    static deleteArticle(options){
        let delArticle = function(){
            return new Promise((resolve,reject)=>{
                ArticleModel.article.findOneAndRemove({_id:options.aid},err=>{
                    if(err) return reject("Remove article faild")
                    resolve('success')
                })
            })
        }
        let delContent = function(){
            return new Promise((resolve,reject)=>{
                ArticleModel.content.findOneAndRemove({aid:options.aid},err=>{
                    if(err) return reject("Remove content faild")
                    resolve('success')
                })
            })
        }
        let delComment = function(){
            return new Promise((resolve,reject)=>{
                ArticleModel.comment.findOneAndRemove({aid:options.aid},err=>{
                    if(err) return reject("Remove comment faild")
                    resolve('success')
                })
            })
        }
        return new Promise((resolve,reject)=>{
            ArticleModel.article.findOne({_id:options.aid}).then(a=>{
                if(a){
                    if(a.uid!==options.uid) return reject('Article uid not equal')
                    Promise.all([ delArticle(),delContent(),delComment()]).then(result=>{
                        resolve('Remove success!')
                    }).catch(error=>{
                        reject(error)
                    })

                }else{
                    reject('The aid not find')
                }
            })
        })

    }
    // 点击喜欢文章 options:{aid:'',uid:''}
    static clickArticleLike(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.article.findOne({_id:options.aid}).then(a=>{
                if(a){
                    if(a.like.indexOf(options.uid)===-1){
                        ArticleModel.article.update({"_id":options.aid},{"$addToSet":{"like":options.uid},"$inc":{"likes":1}},(err,r)=>{
                            if(err) return reject("The like array $addToSet faild")
                                resolve({
                                    info:'Article喜欢+1',
                                    count:1,
                                })
                        })
                    }else{
                        ArticleModel.article.update({"_id":options.aid},{"$pull":{"like":options.uid},"$inc":{"likes":-1}},(err,r)=>{
                            if(err) return reject("The like array $pull faild")
                                resolve({
                                    info:'Article喜欢-1（取消喜欢成功）',
                                    count:-1,
                                })
                        })

                    }
                }else{
                    reject('Find aid faild!')
                }
            })
        })
        function setLikes(){
            return new Promise((resolve,reject)=>{
                ArticleModel.article.findOne({_id:options.aid}).then(a=>{
                    if(a){
                        let likes = a.like.length
                        ArticleModel.article.update({_id:options.aid},{$set:{likes:likes}},err=>{
                            if(err) return reject('Update faild!')
                            resolve(likes)
                        })
                    }else{
                        reject('The aid not find')
                    }
                })
            })
        } 

    }
    // 添加文章评论 options:{aid:'',uid:'',content:''}
    static addComment(options){
        return new Promise((resolve,reject)=>{
            // 带有cid为回复用户
            if(options.cid){
                ArticleModel.comment.findOne({aid:options.aid}).then(a=>{
                    if(a){
                        let replay = {
                            uid:options.uid,
                            content:options.content,
                            c_time:new Date()
                        }
                        ArticleModel.comment.update({"aid":options.aid,"comment.cid":options.cid},{$addToSet:{"comment.$.replay":replay} },(err,r)=>{
                            if(err) return reject('Update error!')
                            return resolve({
                                status:'replay'
                            })
                        })

                    }else{
                        reject('The find aid result is empty ')
                    }
                })
            // 新回复
            }else{
                ArticleModel.comment.findOne({aid:options.aid}).then(a=>{
                    if(a){
                        let cid = myUtill.randomString(7)
                        let comment_time = new Date()
                        let comment_count = a.comment.length
                        ArticleModel.comment.update({aid:options.aid},{$push:{comment:{       //{multi : true }更新所有匹配项目
                            uid:options.uid,
                            content:options.content,
                            c_time:comment_time,
                            zan:[],
                            zans:0,
                            replay:[],
                            cid:cid
                        }}},err=>{
                            if(err) return reject('Update faild')
                            resolve({
                                status:'new',
                                cid:cid,
                                comment_time:comment_time,  //回复时间
                                comment_count:comment_count + 1,
                            }) 
                        })
                    }else{
                        reject('The find aid result is empty ')
                    }
                })
            }
        })
    }
    // 加精 options:{aid:''}
    static setGood(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.article.findOne({_id:options.aid}).then(a=>{
                if(a){
                    if(a.good) return resolve('The article is gooded!')
                    ArticleModel.article.update({_id:options.aid},{$set:{good:true}},err=>{
                        if(err) return reject('Update error!')
                        resolve('Set success!')
                    })
                }
            })
        })

    }
    //文章点赞 options :{aid:'',uid:''}
    static clickArticleZan(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.article.findOne({"_id":options.aid}).then(a=>{
                if(a){
                    if(a.zan.indexOf(options.uid)===-1){
                        ArticleModel.article.update({"_id":options.aid},{"$addToSet":{"zan":options.uid},$inc:{"zans":1}},(err,r)=>{
                            if(err) return reject('Update error!')
                            return resolve({
                                info:'赞+1',
                                count:1
                            })
                        })
                    }else{
                        ArticleModel.article.update({"_id":options.aid},{"$pull":{"zan":options.uid},$inc:{"zans":-1}},(err,r)=>{
                            if(err) return reject('Update error!')
                            return resolve({
                                info:'赞-1',
                                count:-1
                            })
                        })
                    }
                }else{
                    reject('The find aid result is empty ')
                }
            })
        })
    }
    //评论点赞 options :{aid:'',cid:'',uid:''}
    static clickCommentZan(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.comment.findOne({"aid":options.aid}).then(a=>{
                if(a){
                    let exist_cid = false
                    for(let i=0;i<a.comment.length;i++){
                        if(a.comment[i].cid === options.cid){
                                exist_cid = true
                                if(a.comment[i].zan.indexOf(options.uid)===-1){
                                    ArticleModel.comment.update({"aid":options.aid,"comment.cid":options.cid},{$addToSet:{"comment.$.zan":options.uid},$inc:{"comment.$.zans":1}},(err,r)=>{
                                        if(err) return reject('Update error!')
                                        return resolve({
                                            info:'Comment赞+1',
                                            count:1
                                        })
                                    })
                                }else{
                                    ArticleModel.comment.update({"aid":options.aid,"comment.cid":options.cid},{$pull:{"comment.$.zan":options.uid},$inc:{"comment.$.zans":-1}},(err,r)=>{
                                        if(err) return reject('Update error!')
                                        return resolve({
                                            count:-1,
                                            info:'Comment赞-1'
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
    //获取文章 options {keyword:'',category:'ask',likes:'Number',good:boolean}
    static getArticle(options={}){
        return new Promise((resolve,reject)=>{
            let pro ;
            if(options.keyword){
                pro = ArticleModel.article.find({"title":new RegExp(options.keyword,'i')},"-like")
            }else if(options.category){
                pro = ArticleModel.article.find({"category":options.category},"-like")
            }else if(options.likes){
                // Model.find({“age”:{ “$get”:18 , “$lte”:30 } } ); 查询 age 大于等于18并小于等于30的文档
                // “$lt”小于  “$lte”	小于等于   “$gt”大于   “$gte”	大于等于  “$ne”	不等于
                pro = ArticleModel.article.find({"likes":{"$gte":Number(options.likes)}},"-like")
            }else if(options.good){
                pro = ArticleModel.article.find({"good":true},"-like")
            }else{
                // pro = ArticleModel.article.find({"likes":{"$gte":1}})
                pro = ArticleModel.article.find({},"-like")
            }
            pro.then(result=>{
                resolve(result) //返回数组
            }).catch(err=>{
                reject(err)
            })
        })
    }
    // 查看整篇文章 options {aid:''}
    static getArticleById(options={}){
        return new Promise((resolve,reject)=>{
            Promise.all([
                ArticleModel.article.findOne({"_id":options.aid}),
                ArticleModel.content.findOne({"aid":options.aid}),
            ]).then(result=>{
                if(result){
                    resolve(result)
                }else{
                    reject('null')
                }
            })
        })
    }
    // 查看多篇文章主要信息 options {aid:[id1,id2..]}
    static getArticleInfoAll(options={}){
        return new Promise((resolve,reject)=>{
            let proArr =  []
            options.aid.forEach((v,i)=>{
                proArr.push(ArticleModel.article.findOne({"_id":v},"-like"))
            }) 
            Promise.all(proArr).then(result=>{
                if(result){
                    resolve(result)
                }else{
                    reject()
                }
            })
        })
    }
    // aid查评论options {aid:'必传'}
    static getComment(options={}){
        return new Promise((resolve,reject)=>{
            ArticleModel.comment.findOne({"aid":options.aid}).then(c=>{
                    if(c){
                        resolve(c.comment)
                    }else{
                        reject('null')
                    }
                }) 
            })
    }
    // 更新最新回复 {aid:'必传',uplate_time:}
    static updateComment(options={}){
        return new Promise((resolve,reject)=>{
            ArticleModel.article.update({"_id":options.aid},{$set:{"comment_time":options.comment_time,"comment_count":options.comment_count}},err=>{
                if(err) return reject('update update_time faild')
                resolve('success')
            })
        })
    }
    // cid和aid查看评论options {aid:'必传',cid:[id1,id2,...]}
    static getCommentByCid(options={}){
        return new Promise((resolve,reject)=>{
            ArticleModel.comment.findOne({"aid":options.aid}).then(c=>{
                    if(c){
                        let item = {aid:options.aid,  title:c.title||'暂空',  comment:[]}
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


    static  t(){

        // ArticleModel.article.update({"_id":"5b0bb8daef333a1c641b47dc","comment.uid":"www007"},{$set:{"comment.$.content":"改123456改改"}},err=>{
        // ArticleModel.article.update({"_id":"5b0bb8daef333a1c641b47dc","comment.uid":"www007"},{$inc:{"comment.$.zans":1}},err=>{
        ArticleModel.article.update({"_id":"5b0bb8daef333a1c641b47dc","comment._id":"5b0bba591fff622da0ecd180"},{$push:{"comment.$.zan":'1'}},err=>{
            console.log(err);
        })

    }

}


module.exports = Article