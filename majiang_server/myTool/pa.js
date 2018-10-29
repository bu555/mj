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
    static https(){
        let url = 'http://types.yuzeli.com/survey/keirsey' ;
        let pro = new Promise((resolve,reject)=>{
            request.get({url:url,encoding:null},function(err,response,body){
                if(!err&&response.statusCode == 200){
                    // var buf =  iconv.decode(body, 'utf-8');  
                    var $=cheerio.load(body);  
                    // console.log($('body h1').text());  //名字
                    // console.log($('body .summary-pic img').attr('src')); //图片路径
                    // console.log($('body .lemma-summary div').eq(0).text()); //个人简介

                    // console.log($('body #quiz li.q').eq(0).text());
                    $('body #quiz li.q').each(function(index){
                       let q = $(this).find('dl dt').text().split(".")[1].trim();
                       let a = $(this).find('dl dd').eq(0).text().trim();
                       let b = $(this).find('dl dd').eq(1).text().trim();
                    //    let c = $(this).find('dl dd').eq(2).text().trim();
                    //    let d = $(this).find('dl dd').eq(3).text().trim();
                    //    let e = $(this).find('dl dd').eq(4).text().trim();
                    console.log(q);

                        // fs.writeFile(path.join(__dirname,'q_mbti.js'),'',function(){  
                            console.log('写入完毕2');  
                            var buff1=new Buffer(
                                '{'+"\n"+
                                " "+" "+" "+" "+"id:"+'"'+'q'+index+'"'+','+"\n" + 
                                " "+" "+" "+" "+"q:"+'"'+q+'"'+','+"\n" + 
                                " "+" "+" "+" "+"a:"+'"'+a+'"'+','+"\n" + 
                                " "+" "+" "+" "+"b:"+'"'+b+'"'+','+"\n" + 
                                // " "+" "+" "+" "+"c:"+'"'+c+'"'+','+"\n" + 
                                // " "+" "+" "+" "+"d:"+'"'+d+'"'+','+"\n" + 
                                // " "+" "+" "+" "+"e:"+'"'+e+'"'+','+"\n" + 
                                " "+" "+" "+" "+"at:"+'""'+','+"\n" + 
                                " "+" "+" "+" "+"bt:"+'""'+','+"\n" + 
                                // " "+" "+" "+" "+"qt:"+'""'+','+"\n" + 
                                '},'+"\n"
                                ); 
                            //写入文件
                            fs.appendFile(path.join(__dirname,'q_keirsey.js'),buff1,function(){  
                                console.log('写入完毕2');  
                            }); 
                        // }); 

                        // {"q":"总的来说，我待人更倾向于",
                        //     "at":"",
                        //     "bt":"",
                        //     "a":"A. 比较宽容平和",
                        //     "b":"B. 坚持讲究原则"
                        // }
                    })
                    // let info = $('body .lemma-summary div').eq(0).text();
                    // if(info){
                    //     if(info.length<150){
                    //         info += $('body .lemma-summary div').eq(1).text();
                    //         info = info.substr(0,150)+".....";
                    //     }else{
                    //         info += "....."
                    //     }
                    // }
                    // let imgURL = '';
                    // if($('body .summary-pic img').attr('src')){
                    //     imgURL = $('body .summary-pic img').attr('src');
                    // }else if($('body .album-wrap img').attr('src')){
                    //     imgURL = $('body .album-wrap img').attr('src');
                    // }
                    // let imgURL = $('body .album-wrap img').attr('src');
                    resolve({
                        // success:true,
                        // message:'爬取数据成功',
                        // data:{
                        //     imgURL:imgURL,
                        //     info:info,
                        //     name:name,
                        //     tag: '',
                        //     birth: '',
                        //     conste: '', //星座
                        // }
                    });
                    // console.log(__dirname); //当前文件的目录名
                    // console.log(path.join(__dirname,'../','public')); //当前文件的目录名
                    // GrabWeb.saveImage($('body .summary-pic img').attr('src')); //存入本地

                    // var str = $('body a').text();
                    // var date =$('.item').eq(2).children().eq(3).children('a').text()+'\n';
                    // var buff1=new Buffer(str+date+"\n"); 
                    // //写入文件
                    // fs.appendFile(path.join(__dirname,'./txt'),buff1,function(){  
                    //     console.log('写入完毕2');  
                    // }); 
                }else{
                    reject({
                        message:'数据爬取出错',
                        success:false
                    });
                }
            });  
        })
        return pro;
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
GrabWeb.https();
module.exports = GrabWeb;