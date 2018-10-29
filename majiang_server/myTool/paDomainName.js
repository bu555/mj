var http = require("http");  //http模块不能读取ssl加密的https页面，,需要使用request模块替代
var iconv = require('iconv-lite');  //网页非utf-8时，iconv根据网页chartset转码(解决乱码问题)
var cheerio = require('cheerio');  //使用cheerio，相当于使用jQuery操作页面
var request=require('request');  //针对https页面
var fs = require('fs');  
var path=require('path'); 
// var url = 'https://baike.baidu.com/item/%E6%AF%9B%E6%B3%BD%E4%B8%9C/113835' ;
// var url = 'https://baike.baidu.com/item/%E5%88%98%E5%BE%B7%E5%8D%8E/114923' ;

class GrabWeb{
    constructor(){

    }
    static http(){
        http.get('http://types.yuzeli.com/survey/MBTI', function(res){  
            var arrBuf = []; //存储文本数据 
            //监听data事件，传入的数据
            res.on("data", function(chunk){  
                arrBuf.push(chunk);  //存储响应的文本
            })  
            .on("end", function(){  //end事件，全部接收完就触发
                var chunkAll = Buffer.concat(arrBuf, bufLength); //Buffer的concat方法将一组Buffer对象合并为一个Buffer对象（bufLength可选参数，指定合并后Buffer对象的总长度）。  
                var strJson = iconv.decode(chunkAll,'gb2312');    //iconv根据网页chartset转码(解决乱码问题)
                var $ = cheerio.load(strJson);  //使用cheerio，相当于使用jQuery操作页面(相当于$(html))
                console.log($);
                // var str = $('body a').text();
                // var date =$('.item').eq(2).children().eq(3).children('a').text()+'\n';
                // var buff1=new Buffer(str+date+"\n"); 
                // //写入文件
                // fs.appendFile(path.join(__dirname,'./txt'),buff1,function(){  
                //     console.log('写入完毕2');  
                // });  
            })
        });  
    }
    static https(url){
            request.get({url:url,encoding:null},function(err,response,body){
                if(!err&&response.statusCode == 200){
                    var buf =  iconv.decode(body, 'utf-8');  
                    var $=cheerio.load(body);  
                    console.log($('body').html());
                    console.log('123');
// return;

                        // fs.writeFile(path.join(__dirname,'q_mbti.js'),'',function(){  
                            // console.log('写入完毕2');  
                            var buff1=new Buffer(
                                   $('body').text()
                                ); 
                            //写入文件
                            fs.appendFile(path.join(__dirname,'domain.js'),buff1,function(){  
                                console.log('写入完毕2');  
                            }); 

                    // })
                }else{
                } 
        })
    }
    //保存图片
    static saveImage(url){
        request(url).pipe(fs.createWriteStream(path.join(__dirname,'../','public','mzd.jpg')));
    }
    //上传文件
    static uploadFile(url){
        fs.createReadStream('file.json').pipe(request.put(url));
        // 将下载到的文件上传
        // request.get('http://google.com/img.png').pipe(request.put('http://mysite.com/img.png'))
    }
    //验证图片长宽
    static checkImg(url){
        let pro = new Promise((resolve,reject)=>{
            // 创建对象
            var img = new Image();
            // 改变图片的src
            img.src = url;
            // 加载完成执行
            img.onload = function(){
                // 打印
                if(img.width>img.height){
                    reject();
                }else{
                    resolve();
                }
            }
        })
        return pro;
    }
}
GrabWeb.https("https://whois.aliyun.com/whois/domain/baidu.com?spm=5176.8076989.968347.16.633f1838zw7z17&file=baidu.com");
module.exports = GrabWeb;