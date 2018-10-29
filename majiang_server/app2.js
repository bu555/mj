var express = require("express");
var app = express();
var path = require('path');
var http = require('http');
var mongoose = require('mongoose');
const session = require('express-session');
// var MongoDBStore = require('connect-mongodb-session')(session);
const MongoStore = require('connect-mongo')(session);

var bodyParser = require('body-parser'); 
var cors = require('cors')

// 路由配置
var articleRouter = require('./router/articleRouter');
var accountRouter = require('./router/accountRouter');
var userRouter = require('./router/userRouter');
var exampleRouter = require('./router/exampleRouter');
var testRouter = require('./router/testRouter');
var otherRouter = require('./router/otherRouter');
var adminRouter = require('./router/adminRouter');


// 流量過濾
// var RateLimit = require('express-rate-limit');
// app.enable('trust proxy'); // 只有当你使用反向代理（Heroku，Bluemix，AWS，如果你使用ELB，自定义Nginx设置等）时

// 日誌
var log4js = require('./log4js-config');
var logger = log4js.getLogger('logError');
app.use(log4js.connectLogger(logger));



// 连接数据库
var db_uri = 'mongodb://localhost:27017/test' 
mongoose.connect(db_uri, {useNewUrlParser: true }); //mongoose.connect('mongodb://user:password@sample.com:port/dbname', { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接失败！connection error:'));
db.once('open', function() {
  console.log('连接成功！MongoDB connect success')
});


// app.use(cors());//跨域设置
app.set('port',process.env.PORT || 7000)
app.use(cors({credentials: true, origin: ['http://localhost:7075','http://localhost:8000','http://192.168.1.106:7075','http://192.168.1.102:7075']}));//跨域设置
// app.use(cors({credentials: true, origin: 'http://localhost:8000'}));//跨域设置
// app.use(cors());//跨域设置
app.use(bodyParser.urlencoded({extended:false})); //解析请求主体(用于获取post传递的参数)
app.use(bodyParser.json()); //解析application/json



// session 配置
app.use(session({
    secret: 'usersession',
    key: 'usersession',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000*60*60*72 // 设置返回的cookie时效  72小时
    },
    // store: new MongoStore({
    //     url: db_uri,
    //     mongoOptions: 'mySessions' // See below for details
    // })
    // store: new MongoDBStore({
    //           uri: db_uri,
    //           collection: 'mySessions'
    //         })
}))



app.use('/', express.static(path.join(__dirname,'public')));
app.use('/upload', express.static(path.join(__dirname,'upload')));
// app.use('/avatar', express.static(path.join(__dirname,'avatar')));
app.use('/api/user',userRouter);
app.use('/api/example',exampleRouter);
app.use('/api/article',articleRouter);
app.use('/api/account',accountRouter);
app.use('/api/test',testRouter);
app.use('/api/other',otherRouter);
app.use('/api/admin',adminRouter);


http.createServer(app).listen(app.get('port'),function(){
    console.log("Express server running! 启动端口:"+app.get('port'));
})




module.exports = app;

// 登录、注册、密码重置、密码找回 
// 防XSS  md5
// tooken
// 数据分页
// 验证码
// 日志

 