
const ExampleModel = require('../models/schema/example') 
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
const GrabWeb = require('../controllers/grabWeb')

class Example {
    constructor(){
    }
    createExample(options){  //{name:string}  output:example
        return new Promise((resolve,reject)=>{
            ExampleModel.findOne({name:options.name}).then(example=>{
                if(!example){
                    GrabWeb.https(options.name).then(data=>{
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
                    
                        let exampleAdd = new ExampleModel({
                            name: options.name,
                            type: "****",
                            vote: vote,
                            info: data.data.info || '',
                            img_url: data.data.imgURL || '',
                            total: 0, 
                            tag: data.data.tag || '',
                            birth: data.data.birth || '',
                            conste: data.data.conste || '', //星座
                        })
                        exampleAdd.create_time = moment(objectIdToTimestamp(exampleAdd._id)).format('YYYY-MM-DD HH:mm:ss');
                            exampleAdd.save((err, example) => {
                                if (err) {
                                    reject('Data save fail')
                                } else {
                                    resolve(example)
                                }
                            })
                    },data=>{
                        reject(data)
                    })    

                }else{
                    reject('Name already exists!')
                }
            })
        })
    }
    updateExample(options){ //{eid:string,type:'intj'}  output:example
        return new Promise((resolve,reject)=>{
            ExampleModel.findOne({_id:options.eid}).then(example=>{
                if(example){
                    let u_vote = Object.assign({},example.vote)
                    let u_type = example.type
                    if(u_type==='****' ){
                        u_type = options.type
                    }else{
                        if(options.type!==u_type &&u_vote[options.type]+1 > u_vote[u_type]){
                            u_type = options.type
                        }
                    }
                    u_vote[options.type] = u_vote[options.type]+1
                    ExampleModel.update({_id:options.eid},{$set:{
                        vote:u_vote,
                        type:u_type
                    }},err=>{
                        if(!err){
                            ExampleModel.findOne({_id:options.eid}).then(example=>{
                                resolve(example)
                            })
                        }else{
                            reject('Data update fail')
                        }
                    })

                }else{
                    reject('The eid not find')
                }
            })
        })
    }
    searchExample(options){ //{eid:string,name:string,type:string}
        return new Promise((resolve,reject)=>{
            let pro;
            // 1.按name 模糊查询
            if(options.name){
                pro = ExampleModel.find({ name:new RegExp(options.name,'i') });
            // 2.按type 模糊查询
            }else if(options.type){
                pro = ExampleModel.find({ type:new RegExp(options.type,'i') });
            // 3.按id查询
            }else if(options.eid){
                pro = ExampleModel.findOne({ _id:options.eid });
            }else{
                pro = ExampleModel.find();
            }
            pro.then(example=>{
                if(example){
                    resolve(example)
                }else{
                    reject('not find')
                }
            },err=>{
                reject('未知错误')
            })
        })
    }
    
}

module.exports = new Example()