
const express = require('express')
// const router = express.Router()
const UserModel = require('../models/schema/user')
const myUtill = require('../models/utill')
const sha1 = require('sha1')
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
//发送邮件功能
const sendMail = require('../controllers/sendMail')
// 随机验证码
const randomCodePng = require('../controllers/randomCodePng')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin

const Account = require('./accountHandler')

class User {
    constructor(){}
    // 查詢用戶是否註冊  {name:''}
    static checkRegister(options){
        return new Promise((resolve,reject)=>{
            UserModel.findOne({"name":options.name}).then(u=>{
                if(u){
                  resolve(true)
                }else{
                  resolve(false)
                }
            }).catch(err=>{
                reject('Find name error')
            })
        })
    }
    // 注册 {name:'',password:''}
    static register(options){
        return new Promise((resolve,reject)=>{
            // 查詢是否重複註冊
            UserModel.findOne({"name":options.name}).then(user=>{
                if(!user){
                    let userRegister = new UserModel({
                        name: options.name.trim(),
                        password: sha1(options.password.trim()), // 将密码加密
                        r_name:'ABCDEFGHIJ'.charAt(Math.floor(Math.random()*10)) + String(Math.random()).substr(2,7),
                        avatar:'', //头像
                        profile:'', //简介
                        sex:"-1",
                        city:'',
                        birth:'', //
                        grade:0,
                        province:''
                    })
                    userRegister.create_time = moment(objectIdToTimestamp(userRegister._id)).format('YYYY-MM-DD HH:mm:ss');
                    userRegister.save((err, user) => {
                        if(err) return reject('Register save faild')
                        // 加入account 庫
                                Account.addAccountInfo({uid:userRegister._id,name:userRegister.name}).then(r=>{
                                    resolve(userRegister.name) //成功
                                })
                    })
                    
                }else{
                    reject('Registered!The name exist')
                }
                
            }).catch(err=>{
               reject('Register faild')
            })
        })
    }
    //邮箱找回密碼 {email:''}
    static emailRetrieve(options){
      return new Promise((resolve,reject)=>{
          UserModel.findOne({
            name: options.email.toLowerCase()
          }) .then(user => {
            if (user) {
                    let url = 'http://localhost:7075/user/forget?step=3'+'&uid='+user._id+'&pwd='+user.password;
                    let body = `尊敬的用户：<br/>您通过邮箱方式提交了找回密码的请求，请点击下面的链接重置您的密码 。<br/><a href="${url}" target="_blank">${url}</a>`;
                    // 邮件激活
                    sendMail(options.email, "来自cmbti的邮件!", body ,function(){
                        resolve(options.email) //發送OK
                    })
                } else {
                  reject('The email is not registered')
                }
          })
      })
    }
    //重置密码 {uid:'',pwd:''}
    static resetPassword(options){
        return new Promise((resolve,reject)=>{
            UserModel.findOne({_id:options.uid}).then(user=>{
                if(user && user.password===options.pwd){
                  UserModel.update({"_id":options.uid},{$set:{"password":sha1(options.password)}},err=>{
                      if(err) return reject('Reset faild')
                      resolve('success')
                  })
                }else{
                    reject('Reset faild')
                }
            })   
        })   
    }
    // 登录 {name:'',password:'',req:object}
    static login(options){
      return new Promise((resolve,reject)=>{
          UserModel.findOne({ "name": options.name }).then(user => {
              if (!user) {
                reject('Not find the name')
              } else if (sha1(options.password) === user.password) {
                  this.getUserById({uid:user._id}).then(user=>{
                        resolve(user)
                  })
              } else {
                reject('賬號或密碼錯誤')
              }
          })

      })
    }
    // uid查询用户 {uid:''}
    static getUserById(options={}){
        return new Promise((resolve,reject)=>{
            // UserModel.findOne({"_id":options.uid},"-password","avatar r_name").then(user=>{
            UserModel.findOne({"_id":options.uid},"-id -password -create_time -name ").then(user=>{
                if(user){
                    resolve(user)
                }else{
                    resolve(null)
                }
            }).catch((err)=>{
                reject('The uid not find')
            })
        })
    }
    // 修改用户信息 {uid:''}
    static modifyUser(options={}){
        return new Promise((resolve,reject)=>{
            let set = {}
            // 修改名字
            if(options.new_r_name){
                set.r_name = options.new_r_name
                set.modify = false
                set.m_time = Date.now()
            }
            if(options.profile){
                set.profile = options.profile
            }
            if(options.sex){
                set.sex = options.sex
            }
            if(options.city){
                set.city = options.city
            }
            if(options.province){
                set.province = options.province
            }
            if(options.birth){
                set.birth = options.birth
            }
            if(options.avatar){
                set.avatar = options.avatar
            }
            if(Object.keys(set).length<1){
                reject('params error')
            }
            UserModel.update({"_id":options.uid},{$set:set},err=>{
                if(err) return reject('modify faild')
                resolve('modify success')
            })

        })
    }
    // 检查昵称是否重复 {uid:''}
    static checkRoleName(options={}){
        return new Promise((resolve,reject)=>{
            let r_name = options.new_r_name.trim()
            UserModel.find().then(user=>{
                if(user && (user instanceof Array)){
                    for(let i=0;i<user.length;i++){
                        if(user[i].r_name==r_name){
                            return resolve(true)
                        }
                    }
                    resolve(false)
                }

            })

        })
    }

}

// 登出 delete user session
const delSession = (req, res) => {
  if (req.session.user){
      req.session.user = null;
  }
  res.json({
      success:true,
      message: '登出成功'
  })
}

module.exports = User