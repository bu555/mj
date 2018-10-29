
const TestModel = require('../models/schema/testSchema') 
const myUtill = require('../models/utill')
class Test {
    constructor(){
    }
    // 添加测试结果 options:{category:'',uip:'',res:'Object'}
    static addTest(options){
        return new Promise((resolve,reject)=>{
            // 创建tid
            // let tid = ''
            // tid = options.category==='mbti' ? 'mbti': tid
            // tid = options.category==='func' ? 'func': tid
            // if(!tid){
            //     return reject('type 参数错误')
            // }
            // tid += ('_'+Date.now() + '_'+myUtill.randomLowercaseString(1))
            let type = ''
            type += options.res.e > options.res.i ?'e':'i'
            type += options.res.s > options.res.n ?'s':'n'
            type += options.res.t > options.res.f ?'t':'f'
            type += options.res.j > options.res.p ?'j':'p'

            let test = new TestModel({
                // tid:tid,
                category:options.category,
                type:type,
                uip:options.uip || '',
                c_time:new Date(),
                res:options.res || {}
            })
            test.save((err)=>{
                if(err) return reject('The TestModel add failed')
                resolve({
                    tid:test._id,
                    type:test.type,
                    category:test.category,
                    res:options.res
                })
            })
        })
    }
    // 查询测试结果 options:{tid:''}
    static getTestById(options){
        return new Promise((resolve,reject)=>{
            TestModel.findOne({"_id":options.tid}).then(t=>{
                if(t){
                    resolve(t)
                }else{
                    reject()
                }
            })
        })
    }
    // 删除测试结果 options:{tid:‘’ }
    static deleteTestById(options){
        return new Promise((resolve,reject)=>{
            TestModel.findOneAndRemove({_id:options.tid},err=>{
                if(err) return reject("Remove test faild")
                resolve('success')
            })
        })
    }


}


module.exports = Test