
const express = require('express')
const router = express.Router()
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin

const User = require('../controllers/userHandler')
const Account = require('../controllers/accountHandler')
const Limiter = require('../middlewares/limiter')
var fm = require('formidable');
const fs = require('fs')
const path = require('path')
const GrabWeb = require('../controllers/grabWeb')

var logger = require('log4js').getLogger('logError');

var china = require('../asset/city_data2016')      

// 中国省市 { }
const getChina = (req, res,next) => {
    let data = []
    china.forEach((v,i) => {
        let temp = {}
        temp.n = v.n
        temp.s = []
        v.s.forEach((v1,i1)=>{
            temp.s.push({n:v1.n})
        })
        data.push(temp)
    })
    res.json({
        success:true,
        data:data
    })
}
// 上传图片 {type:'文件夹类型avatar/example/article'，}   请求头： return axios.post(pathAPI+'/user/uploadPhoto',data,{headers: {'Content-Type': 'multipart/form-data'}});
const uploadImage = async (req,res)=>{

    try {
        // saveUploadFile {fileName:'8.jpg',req:req,type:'example/avatar/article'}
        let url = await GrabWeb.saveUploadFile({req:req})
    
        res.json({
            success:true,
            url:url
        })
    }catch(err){
        logger.error(err)
        console.log(err);
        res.json({
            success:false
        })
    }
}
// 上传网络图片 {url:''});
const uploadNetworkImage = async (req,res)=>{ 
    let options = req.body || {}   
    // 参数验证
    if( !options.url ){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }

    try {
        // saveUploadFile {fileName:'8.jpg',req:req,type:'example/avatar/article'}
        let url = await GrabWeb.downloadNetworkImage({imgURL:options.url})
        res.json({
            success:true,
            url:url
        })
    }catch(err){
        logger.error(err)
        console.log(err);
        res.json({
            success:false
        })
    }
}

router.get('/getChina',getChina);
router.post('/uploadImage',uploadImage);
router.post('/uploadNetworkImage',uploadNetworkImage);
module.exports = router