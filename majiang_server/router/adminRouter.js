
const express = require('express')
const router = express.Router()
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin

const User = require('../controllers/userHandler')
const Account = require('../controllers/accountHandler')
const Limiter = require('../middlewares/limiter')
const moment = require('moment')
var fm = require('formidable');
const fs = require('fs')
const path = require('path')

var logger = require('log4js').getLogger('logError');
    
const Category = ['personality','func']
// 类型：
const Types = ['entp','intp','entj','intj','enfp','infp','enfj','infj','estj','istj','esfj','isfj','estp','istp','esfp','isfp']

// {title:'',content:'',category:'personality',key:'intj/ni',id:'有即为编辑'}
const setDocument = async (req, res,next) => {
    let options = req.body
    if(!options.title || !options.content ||
        // (!options.key||Types.indexOf(options.key)===-1) ||
        (!options.category || Category.indexOf(options.category)===-1)  
    ){
        return res.json({
            success:false,
            message:'params error!'
        })
    }
    // 新建一条文档
    let doc = {
        category:options.category,
        title:options.title,
        content:options.content,
        key:options.key,
    }
    let flieName = path.join( process.cwd(),'doc',options.category+'.json')
    try {
        await createFile(flieName)
        fs.readFile(flieName, 'utf8', function(err, data){ 
            if(!err){   
                data = JSON.parse(data)
                let time = moment(new Date()).utc().format()
                // 编辑
                if(options.id){
                    let id_exists = false
                    for(let i=0;i<data.length;i++){
                        if(data[i].id===options.id){
                            doc.e_time = time
                            data[i] = Object.assign(data[i],doc)
                            id_exists = true
                            break
                        }
                    }
                    if(!id_exists){
                        return res.json({
                            success:false,
                            data:null,
                            message:'查无id'
                        })
                    }
                }else{
                    doc.c_time = time,
                    doc.e_time = time,
                    doc.id = myUtill.randomLowercaseString(9)
                    data.push(doc)
                    for(let i=0;i<data.length;i++){
                        if(data[i].key===options.key){
                            return res.json({
                                success:false,
                                data:null,
                                message:'key重复'
                            })
                        }
                    }
                }
                fs.writeFile(flieName, JSON.stringify(data) ,function(err){
                    if(!err){       
                        res.json({
                            success:true,
                            message:'写入成功'
                        })
                    }else{
                        res.json({
                            success:false,
                            data:null,
                            message:'写入失败'
                        })
                    }
                });
            }else{
                res.json({
                    success:false,
                    data:null,
                    message:'读取失败'
                })
            }
        })
    }catch(err){
        res.json({
            success:false,
            data:null,
            message:err
        })

    }
    function createFile(fileName){
        return new Promise((resolve,reject)=>{
            fs.exists(fileName,function(exists){
                if(exists){
                    resolve()
                }
                if(!exists){
                    fs.writeFile(fileName, '[]' ,function(err){
                        if(!err){
                            resolve()
                        }else{
                            reject()
                        }
                    })
                }
            })
        })
    }
}
// params:{category:'必须',id:'可选'}
const getDocument = async (req, res,next) => {
    let options = req.body    
    if( (!options.category || Category.indexOf(options.category)===-1) ){
        return res.json({
            success:false,
            message:'params error!'
        })
    }
    try {
        let flieName = path.join( process.cwd(),'doc',options.category+'.json')
        fs.readFile(flieName, 'utf8', function(err, data){ 
            if(!err){  
                data = JSON.parse(data)
                let exists = false //是否存在
                // id查找
                if(options.id){
                    for(let i=0;i<data.length;i++){
                        if(data[i].id===options.id){
                            data = [ data[i] ]
                            exists = true
                            break
                        }
                    }
                // key查找
                }else if(options.key){
                    for(let i=0;i<data.length;i++){
                        if(data[i].key===options.key){
                            data = [ data[i] ]
                            exists = true
                            break
                        }
                    }
                }else{
                    exists = true
                    for(let i=0;i<data.length;i++){
                        data[i].content = ''
                    }
                }
                res.json({
                    success:exists ? true : false,
                    data:exists ? data : null
                })
                
            }else{
                res.json({
                    success:false,
                    data:null,
                    message:'查询失败!'
                })
            }
        });
    }catch(err){
        res.json({
            success:false,
            data:null,
            message:err
        })

    }
}



router.post('/setDocument',setDocument);
router.post('/getDocument',getDocument);
module.exports = router