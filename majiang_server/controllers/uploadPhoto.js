// 第一步:引入express，创建express对象监听端口以及引入path文件
var express=require('express');
var path=require('path');
var fm=require('formidable');
var cors = require('cors')
var app=express();
var fs=require('fs')
// 第二步:创建静态文件public，并在项目的文件夹中创建image，css,javascript
// app.use(express.static(path.join(__dirname,'mmmm')));
app.use(cors());//跨域设置
// 
// 第三步:接收浏览器请求，并返回HTML文件
app.get('/',function(req,res){
// res.sendFile(path.join(__dirname,'main.html'))
// 第四步:创建main.html文件
})
// 第五步:接收ajax的post请求
app.post('/ajaxUpload',function(req,res){
    console.log('請求來了');
// 5.1创建formidable文件解析上传数据
// 注:下载安装formidable，引入formidable再创建formidable
var form=new fm.IncomingForm();
// 5.2设置路径
// 注：把路径设置为静态路径下的uploads，需在public下创建uploads
form.uploadDir=path.join(__dirname,'/uploads')
// uploadDir设置文件的上传的路径
// 5.3解析上传内容
form.parse(req);
// 5.4 监听end事件，判断是否上传结束
form.on('end',function(){
console.log('upload success')
})
// 5.5监听file事件(在服务器的路径下，有上传的文件)，处理上传内容
form.on('file',function(field,file){//file是上传的文件
// 5.5.1 更改上传文件的名字
// 使用同步更改
fs.renameSync(file.path,path.join(form.uploadDir,'/icon.png'))
// 第一个参数file.path表示上传的文件所在的路径
// 5.5.2发送给浏览器端(客户端)
// res.send('./uploads/icon.png')
})
})
app.listen(3001)