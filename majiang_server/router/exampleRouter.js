
const express = require('express')
const router = express.Router()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin 
const Example = require('../controllers/exampleHandler')
const User = require('../controllers/userHandler')
const Account = require('../controllers/accountHandler')
var xss = require('xss');
var logger = require('log4js').getLogger('logError');
const GrabWeb = require('../controllers/grabWeb')

// 添加example {bakeList:[],currentIndex:'',sName:''}
const addExample = (req,res)=>{
    let options = req.body || {};
    options.uid = req.session.user._id;
    console.log(options.uid, 'uid');
    if(!options.baikeList || !(options.baikeList instanceof Array) || options.baikeList.length<1 || !options.sName || (!options.currentIndex && options.currentIndex!==0 ) ){
        return res.json({
            success: false,
            message: '参数错误' 
        })
    }
    // console.log(3,options.baikeList);
    // (options.baikeList).forEach((v,i)=>{
    //     console.log('vvv',v);
    //     if(!v.name || !v.imgURL || !v.info ){
    //         return res.json({
    //             success: false,
    //             message: '参数错误' 
    //         })
    //     }
    // })

    for(let i=0;i<options.baikeList.length;i++){
        let v = options.baikeList[i]
        if(!v.name || !v.imgURL || !v.info ){
            return res.json({
                success: false,
                message: '参数错误' 
            })
        }
    }

    (async ()=>{

        try{
            // 查找name是否存在(返回数组)
            let searchRes = await Example.searchExample({name:options.sName,strict:true})
            if(searchRes.length>1) throw '此名字已存在'
            let currentExample //变量记录用户点击的名人
            let pro = []
            for(let i=0;i<options.baikeList.length;i++){
                let _option = JSON.parse(JSON.stringify(options.baikeList[i]))
                _option.sName = options.sName
                _option.uid = options.uid
                pro.push(Example.createExample( _option ))
            }
            let list = await  Promise.all(pro)
            // 获取用户点击的名人
            currentExample = list[options.currentIndex]
            if(currentExample){
                res.json({
                    success:true,
                    message:'success',
                    example:currentExample
                })
            }else{
                throw '当前名人createExample存取失败'
            }

        }catch(err){
            logger.error(err);
            console.log(err);
            res.json({
                success:false,
                message:err.indexOf('exist')>0 ? err:'name is exist'
            })
        }
    })()
    
}
const searchExample = (req,res,next)=>{
    let options = req.body.params
    if(options.name){
        options.name = myUtill.strTrim(options.name)
    }
    Example.searchExample(options).then(example=>{
            // 分页处理
            if(!example){
                example = []
            }else if(!(example instanceof Array)){
                example = [example]
            }
            // 设置排序 ：有投票>无投票 + 有投票（时间优先）
            if(example.length>1){
                let notVoteList = []
                let list = []
                example.forEach((v,i)=>{
                    if(v.type==='****') {
                        notVoteList.push(v)
                    }else{
                        list.push(v)
                    }
                })
                let temp
                for(let i=0;i<list.length-1;i++){
                    let flag = 1
                    for(let j=0;j<list.length-i-1;j++){
                        if(list[j].total<list[j+1].total){
                            temp = list[j]
                            list[j] = list[j+1]
                            list[j+1] = temp
                            flag = 0
                        }
                    }
                    if(flag===1) break  //如果没发生交换，说明数组有序
                }
                example = list.concat(notVoteList)
            }
            let reg = /^[1-9]\d{0,}$/    // 非零非负整数
            let page = reg.test(options.page)? Number(options.page):1
            let size = reg.test(options.size)? Number(options.size):8
            let total = example.length
            if(example.length>size){
                example = example.slice( (page-1)*size , page*size)
            }
            // 数据库无数据
            if(options.name && example.length<1){
                // 百度搜索
                GrabWeb.https({name:options.name}).then(data=>{
                    return res.json({
                        success:true,
                        message:'ok',
                        result:{
                            sName:options.name, //搜索的名字
                            example:(data instanceof Array)?data:(data?[data]:[]), //返回搜索结果列表
                            baike:true
                        }
                    })
                })
            }else{
                // 返回数据库结果
                res.json({
                    success:true,
                    message:'ok',
                    result:{
                        example:example,
                        size:size,
                        page:page,
                        total:total
                    }
                })
            }
    }).catch(err=>{
        console.log(err);
        logger.error(err);
        res.json({
            success:false,
            message:'error'
        })
    })
}
// 投票
const goVote = (req,res,next)=>{
      let options = {}
      options.uid = req.session.user._id;
      options.eid = req.body.eid?req.body.eid:''
      options.result = req.body.result?req.body.result:'';
      if(!options.eid || !myUtill.testVote(options.result)){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
      }

      // 添加到vote list
      Example.addVote(options).then(example=>{
            Account.addVoteLog(options).then(r=>{
                res.json({
                    success:true,
                    message:'success',
                    // example:example
                })
            })
      }).catch(err=>{
          logger.error(err);
            res.json({
                success:false,
                message:err
            })
      })

}
// 评论 options:{eid:'',result:''}
const addComment = (req,res,next)=>{
      let uid = req.session.user._id;
      let eid = req.body.eid?req.body.eid:''
      let content = req.body.content?req.body.content:'';
      if(!eid || !content){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
      }
      let options = {
          uid: uid,
          eid: eid,
          content: xss(content),
          cid: req.body.cid ? req.body.cid :''
      }
      // 添加到vote list
      Example.addComment(options).then(r=>{
          if(r.status==='new'){
              options.cid = r.cid
              //添加个人记录
              Account.addCommentLog(options).then(r=>{
                  res.json({
                      success:true,
                      message:'success',
                  })
              })
          }else{
            res.json({
                success:true,
                message:'success',
            })
          }
      }).catch(err=>{
           logger.error(err);
            res.json({
                success:false,
                message:'error'
            })
      })

}
// aid 获取评论 options {aid:'必传',page:'必传',size:'必传'}
const getComment = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user ? req.session.user._id : ''
        // options.eid = req.body.aid || ''
        // options.page = req.body.page || ''
      if(!options.eid || !myUtill.verifyNum(options.page) || !myUtill.verifyNum(options.size)){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let size = myUtill.verifyNum(options.size) ? Number(options.size) : 5  //每次条数
                let page = myUtill.verifyNum(options.page) ? Number(options.page) : 1  //页数
                let list = await Example.getComment(options)
                // 排序
                if(options.type && options.type==='hot'){
                    let temp
                    for(let i=0;i<list.length-1;i++){
                        let flag = 1
                        for(let j=0;j<list.length-i-1;j++){
                            if(list[j].zans<list[j+1].zans){
                                temp = list[j]
                                list[j] = list[j+1]
                                list[j+1] = temp
                                flag = 0
                            }
                        }
                        if(flag===1) break  //如果没发生交换，说明数组有序
                    }
                }else if(options.type && options.type==='time'){
                    list = list.reverse() //倒置
                }

                let newList = JSON.parse(JSON.stringify(list.slice((options.page-1)*options.size, (options.page-1)*options.size + options.size)))
                let proArr = []
                newList.forEach((v,i)=>{
                    proArr.push(User.getUserById({uid:v.uid}))
                })
                let userList = await Promise.all(proArr)
                for(let i=0;i<newList.length;i++){
                    if(userList[i]){
                        newList[i].r_name = userList[i].r_name
                        newList[i].avatar = userList[i].avatar 
                    }else{
                        newList[i].r_name = '已注销'
                        newList[i].avatar = ''
                    }
                    if(options.uid){ //如果登錄，確認是否點過贊
                        newList[i].isZaned = newList[i].zan.indexOf(options.uid)===-1 ?  false : true
                    }
                    newList[i].zan = null
                    // 在回复别的情况下,根据cid获取对应信息
                    let replay = null
                    if(newList[i].replay instanceof Array && newList[i].replay.length>0){

                        for(let k=0;k<newList[i].replay.length;k++){
                            let u = await User.getUserById({uid:newList[i].replay[k].uid})
                            newList[i].replay[k].r_name = u?u.r_name:'已注销'
                            delete newList[i].replay[k]._id
                            // if(list[k].cid===newList[i].replay){
                            //     let u = await User.getUserById({uid:list[k].uid})
                            //     newList[i].rep = {
                            //         content:list[k].content,
                            //         r_name:u?u.r_name:'已注销',
                            //         uid:list[k].uid
                            //     }
                            // }
                        }
                    }
                }

                res.json({
                    success: true,
                    message: 'Success',
                    data:newList,
                })
            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: err 
                })
            }
      })()
}
// 评论点赞
const clickCommentZan = (req,res,next)=>{ //{page:num}
    let options = req.body || {}
    options.uid = req.session.user._id;
    // 参数验证
    if(!options.uid || !options.eid || !options.cid ){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            let r = await Example.clickCommentZan(options)  
            
            res.json({
                success: true,
                message: 'success',
                result: r,  //count 1 或-1
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
// 根据id获取example详情
const getExampleById = (req,res,next)=>{
    // let login = req.session.user  //是否登录
    let eid = req.query.eid || ''
    let uid = req.session.user ? req.session.user._id : ''
    if(!eid){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
    }


    (async ()=>{
        try{
            Example.getExampleById({eid:eid,uid:uid}).then(example=>{
                    if(example){
                        res.json({
                            success:true,
                            message:'ok',
                            example:example,
                        })
                    }
            })

        }catch(err){
            logger.error(err);
            res.json({
                success:false,
                message:'error'
            })
        }
    })()



}
// 点击喜欢(收藏)的人物  input : {uid:'',eid:''}
const clickExampleLike = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user._id;
    // 参数验证
    if(!options.uid || !options.eid ){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            let r = await Example.clickExampleLike(options)
            // 添加结果到账户记录
            // offset===1  aid添加到account likes_atricle数组中 offset===-1 从account likes_atricle数组中移除aid
            options.offset = r.count  //返回1 或-1
            let updated = await Account.clickLikeExampleLog(options)
            res.json({
                success: true,
                message: 'Success',
                result:r
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

router.post('/addExample',checkLogin,addExample);
router.post('/searchExample',searchExample);
router.post('/goVote',checkLogin,goVote);
router.post('/addComment',checkLogin,addComment);
router.get('/getExampleById',getExampleById);
router.post('/getComment',getComment);
router.post('/clickCommentZan',checkLogin,clickCommentZan);
router.post('/clickExampleLike',checkLogin,clickExampleLike);

module.exports = router