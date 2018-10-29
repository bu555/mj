
const express = require('express')
const router = express.Router();
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin 
const Article = require('../controllers/articleHandler')
const Account = require('../controllers/accountHandler')
const Example = require('../controllers/exampleHandler')
const User = require('../controllers/userHandler')
const Test = require('../controllers/testHandler')
const fs = require('fs')
const path = require('path')
var logger = require('log4js').getLogger('logError');


// 获取账户info options {} //需登錄
const getAccountInfoById = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user._id
      if(!options.uid){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let r = await Account.getUserInfoById(options)
                let result = {}
                for(let key in r){
                    if(r[key] instanceof Array){
                        result[key] = r[key].length
                    }
                }

                res.json({
                    success: true,
                    message: 'Success',
                    data:result
                })

            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 关注/取消关注用户 options:{uid:'',uuid:'',status:'1'/'0'} 1关注 0取消关注
const followUser = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user._id
      if(!options.uid || !options.uuid ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let r = await Account.followUser(options)

                res.json({
                    success: true,
                    info: r.info,
                    count:r.count //关注1，取消关注-1
                })

            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 获取用户评论历史展示 options:{}返回格式：{aid:[{aid:'',cid:[id,id,..]}],eid:[{eid:'',cid:[id,id,..]}]}
const getCommentList = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user._id;
    (async ()=>{
        try{
            let added = [] //存放已添加的eid 或aid
            let myComment = {
                eid:[],
                aid:[]  //[{aid:'',cid:[id,id,id]}]
            }
            let accountInfo = await Account.getUserInfoById(options)
            for(let i=0;i<accountInfo.my_comment.length;i++){
                if( added.indexOf(accountInfo.my_comment[i].eid)>-1 || added.indexOf(accountInfo.my_comment[i].aid)>-1) continue;
                let item = {cid:[]}
                if(accountInfo.my_comment[i].eid){
                    added.push(accountInfo.my_comment[i].eid)
                    item.eid = accountInfo.my_comment[i].eid
                }
                if(accountInfo.my_comment[i].aid){
                    added.push(accountInfo.my_comment[i].aid)
                    item.aid = accountInfo.my_comment[i].aid
                }
                item.cid.push(accountInfo.my_comment[i].cid)
                for(let j=i+1;j<accountInfo.my_comment.length;j++){
                    if(accountInfo.my_comment[i].eid){
                        if(accountInfo.my_comment[i].eid===accountInfo.my_comment[j].eid){
                            item.cid.push(accountInfo.my_comment[j].cid)
                        }
                    }
                    if(accountInfo.my_comment[i].aid){
                        if(accountInfo.my_comment[i].aid===accountInfo.my_comment[j].aid){
                            item.cid.push(accountInfo.my_comment[j].cid)
                        }
                    }
                }
                if(accountInfo.my_comment[i].eid){
                    myComment.eid.push(item)
                }
                if(accountInfo.my_comment[i].aid){
                    myComment.aid.push(item)
                }
                
            }
            
            res.json({
                success: true,
                message: 'Success',
                data: myComment  //返回处理后的评论记录

            })

        }catch(err){
            logger.error(err);
            return res.json({
                success: false,
                message: 'catch error' 
            })
        }
    })()
}
// 獲取評論 options:{aid:[{aid:'',cid:[c1,c2,...]}]} 獲取文章評論
const getMyCommentArt = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user._id
      if(!options.uid || !(Object.keys(options).indexOf('aid')>-1) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      if(!(options.aid instanceof Array) || !options.aid.length>0 ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let proArr = []
                options.aid.forEach((v,i)=>{
                    proArr.push(Article.getCommentByCid(v))
                })
                let itemList = await Promise.all(proArr)

                res.json({
                    success: true,
                    data:itemList
                })

            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 獲取評論 options:{eid:[{eid:'',cid:[c1,c2,...]}]} 獲取名人評論
const getMyCommentExa = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user._id
      if(!options.uid || !(Object.keys(options).indexOf('eid')>-1) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      if(!(options.eid instanceof Array) || !options.eid.length>0 ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let proArr = []
                options.eid.forEach((v,i)=>{
                    proArr.push(Example.getCommentByCid(v))
                })
                let itemList = await Promise.all(proArr)

                res.json({
                    success: true,
                    data:itemList
                })

            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 獲取my测试结果(多条)
const getMyTest = (req,res)=>{
        let options = req.query || {}
        options.uid = req.session.user._id
      if(!options.uid  || !(/^[1-9]+\d*$/.test(options.size)) || !(/^[1-9]+\d*$/.test(options.page)) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let account = await Account.getUserInfoById(options)
                let proArr = []
                let accountList = JSON.parse(JSON.stringify( account.test_record.slice( (options.page-1)*options.size,options.page*options.size ) ))
                console.log(options.size,options.page);
                accountList.forEach((v,i)=>{
                    proArr.push(Test.getTestById({tid:v}))
                })
                let itemList = proArr.length>0? await Promise.all(proArr) : []

                res.json({
                    success: true,
                    data:itemList
                })

            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 獲取my投票记录
const getMyVote = (req,res)=>{
        let options = req.query || {}
        options.uid = req.session.user._id
      if(!options.uid || !(/^[1-9]+\d*$/.test(options.size)) || !(/^[1-9]+\d*$/.test(options.page)) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let account = await Account.getUserInfoById(options)
                let proArr = []
                // 投票的eid列表
                let accountList = JSON.parse(JSON.stringify( account.vote_example.slice( (options.page-1)*options.size,options.page*options.size ) ))
                // let accountList = JSON.parse(JSON.stringify(account.vote_example))
                accountList.forEach((v,i)=>{
                    proArr.push(Example.getExampleById({eid:v.eid}))
                })
                let itemList = proArr.length>0? await Promise.all(proArr) : []
                for(let i=0;i<accountList.length;i++){
                    for(let j=0;j<itemList.length;j++){
                        if(itemList[j]._id==accountList[i].eid){
                            accountList[i].name = itemList[j].name
                            accountList[i].name1 = itemList[j].name1?itemList[j].name1:''
                            accountList[i].info = itemList[j].info
                            accountList[i].img_url = itemList[j].img_url
                            accountList[i].type = itemList[j].type
                        }
                    }
                }

                res.json({
                    success: true,
                    data:accountList
                })

            }catch(err){
                logger.error(err);
                console.log(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 獲取my关注人物
const getMyMarkExample = (req,res)=>{
        let options = req.query || {}
        options.uid = req.session.user._id
        console.log(options);
      if(!options.uid || !(/^[1-9]+\d*$/.test(options.size)) || !(/^[1-9]+\d*$/.test(options.page)) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let account = await Account.getUserInfoById(options)
                let proArr = []
                let accountList = JSON.parse(JSON.stringify( account.likes_example.slice( (options.page-1)*options.size,options.page*options.size ) ))
                // let accountList = JSON.parse(JSON.stringify(account.vote_example))
                accountList.forEach((v,i)=>{
                    proArr.push(Example.getExampleById({eid:v}))
                })
                let itemList = proArr.length>0? await Promise.all(proArr) : []
                for(let i=0;i<accountList.length;i++){
                    for(let j=0;j<itemList.length;j++){
                        if(itemList[j]._id==accountList[i]){
                            accountList[i] = {
                                eid:accountList[i]
                            }
                            // accountList[i].name = itemList[j].name
                            // accountList[i].name1 = itemList[j].name1?itemList[j].name1:''
                            // accountList[i].type = itemList[j].type?itemList[j].type:''
                            accountList[i] = itemList[j]
                        }
                    }
                }

                res.json({
                    success: true,
                    data:accountList
                })

            }catch(err){
                logger.error(err);
                console.log(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 獲取我的发表文章 options:{page:'',size:''}
const getMyArticle = (req,res)=>{
        let options = req.query || {}
        // if(!options.uid){
        //     options.uid = req.session.user._id 
        // }
      if( !options.uid || !myUtill.verifyNum(options.page) || !myUtill.verifyNum(options.size) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let page = Number(options.page)
                let size = Number(options.size)
                let acc = await Account.getUserInfoById(options)
                let aids = acc.my_article.slice( (page-1)*size , size+(page-1)*page )
                if(aids.length<1){
                    return res.json({
                        success: true,
                        message: 'Success',
                        data: []
                    })
                }
                let result = await Article.getArticleInfoAll({aid:aids})
                res.json({
                    success: true,
                    message: 'Success',
                    data: result
                })
            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 獲取我收藏（喜欢）的文章 options:{page:'',size:''}
const getMyLikes = (req,res)=>{
        let options = req.query || {}
        options.uid = req.session.user._id 
      if( !options.uid || !myUtill.verifyNum(options.page) || !myUtill.verifyNum(options.size) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let page = Number(options.page)
                let size = Number(options.size)
                let acc = await Account.getUserInfoById(options)
                let aids = acc.likes_atricle.slice( (page-1)*size , size+(page-1)*page )
                if(aids.length<1){
                    return res.json({
                        success: true,
                        message: 'Success',
                        data: []
                    })
                }
                let result = await Article.getArticleInfoAll({aid:aids})
                res.json({
                    success: true,
                    message: 'Success',
                    data: result
                })
            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 獲取关注我的 options:{page:'',size:''}
const getMyFollowing = (req,res)=>{
        let options = req.query || {}
        options.uid = req.session.user._id 
      if( !options.uid || !myUtill.verifyNum(options.page) || !myUtill.verifyNum(options.size) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let page = Number(options.page)
                let size = Number(options.size)
                let acc = await Account.getUserInfoById(options)
                let uids = acc.following.slice( (page-1)*size , size+(page-1)*page )
                if(uids.length<1){
                    return res.json({
                        success: true,
                        message: 'Success',
                        data: []
                    })
                }
                let proArr = [] 
                uids.forEach((v,i)=>{
                    proArr.push(User.getUserById({uid:v}))
                })
                let list = await Promise.all(proArr)
                res.json({
                    success: true,
                    data:list
                })
            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 獲取我关注的 options:{page:'',size:''}
const getMyFollowers = (req,res)=>{
        let options = req.query || {}
        options.uid = req.session.user._id 
      if( !options.uid || !myUtill.verifyNum(options.page) || !myUtill.verifyNum(options.size) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let page = Number(options.page)
                let size = Number(options.size)
                let acc = await Account.getUserInfoById(options)
                let uids = acc.followers.slice( (page-1)*size , size+(page-1)*page )
                if(uids.length<1){
                    return res.json({
                        success: true,
                        message: 'Success',
                        data: []
                    })
                }
                let proArr = [] 
                uids.forEach((v,i)=>{
                    proArr.push(User.getUserById({uid:v}))
                })
                let list = await Promise.all(proArr)
                res.json({
                    success: true,
                    data:list
                })
            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}


// 查看用户的资料、发表文章
const getUserInfoShow = (req, res) =>{  
    let options = req.query || {}
    let uid = req.session.user ? req.session.user._id : ''  //操作用户uid
    if(!options.uid){
          return res.json({
            success: false,
            message: "参数格式错误"
          })
    }
    (async ()=>{
        try{
            let userInfo = await Promise.all([ User.getUserById(options),Account.getUserInfoById(options) ])
            let isFollow = false
            if(uid){ //如果是登录用户访问，判断是否关注了此uid
                let acc = await Account.getUserInfoById({uid:uid})
                isFollow = acc.followers.indexOf(options.uid)!=-1 ? true :false
            }
            res.json({
                success: true,
                data:{
                    avatar:userInfo[0].avatar,
                    birth:userInfo[0].birth,
                    province:userInfo[0].province,
                    city:userInfo[0].city,
                    r_name:userInfo[0].r_name,
                    profile:userInfo[0].profile,
                    sex:userInfo[0].sex,
                    my_article:userInfo[1].my_article,
                    isFollow:isFollow
                }
            })
        }catch(err){
            logger.error(err);
            res.json({
                success: false
            })
        }
    })()
}
// 回复评论  input : {aid:'',uid:'',content:'',cid:'回复别人id'}
// const addComment = (req,res)=>{
//     let options = req.body || {}
//     options.uid = req.session.user._id;
//     // 参数验证
//     if(!options.uid ||!options.content || (!options.aid && !options.eid) ) {
//         return res.json({
//             success: false,
//             message: 'Params Error' 
//         })
//     }
//     (async ()=>{
//         try{
//             options.content = xss(options.content)

//             if(options.aid){

//             }

//             let r = await Article.addComment(options)  //返回cid
//             // options = Object.assign(r,options)
//             options.cid = r.cid  //这是新回复的cid
//             options.update_time = r.update_time
//             options.com_count = r.com_count
//             // 加入到个人记录,更新Article最新时间
//             await Promise.all([
//                 Account.addCommentLog(options),
//                 Article.setUpdateTime(options)
//             ])
//             // let added = await Account.addCommentLog(options)
//             // 记录加入account
//             res.json({
//                 success: true,
//                 message: 'Success',
//             })

//         }catch(err){
//             logger.error(err);
//             return res.json({
//                 success: false,
//                 message: 'catch error' 
//             })
//         }


//     })()
// }

router.get('/getAccountInfo',checkLogin,getAccountInfoById);
router.get('/getCommentList',checkLogin,getCommentList);
router.post('/getMyCommentArt',checkLogin,getMyCommentArt);
router.post('/getMyCommentExa',checkLogin,getMyCommentExa);
router.post('/followUser',checkLogin,followUser);
router.get('/getUserInfoShow',getUserInfoShow);
router.get('/getMyTest',checkLogin,getMyTest);
router.get('/getMyVote',checkLogin,getMyVote);
router.get('/getMyMarkExample',checkLogin,getMyMarkExample);
router.get('/getMyArticle',getMyArticle);
router.get('/getMyLikes',checkLogin,getMyLikes);
router.get('/getMyFollowing',checkLogin,getMyFollowing);
router.get('/getMyFollowers',checkLogin,getMyFollowers);

// router.post('/goVote',checkLogin,goVote);
// router.post('/addComment',checkLogin,addComment);
// router.post('/getExampleById',getExampleById);
// router.post('/getComment',getComment);
// router.post('/clickZan',checkLogin,clickZan);
module.exports = router