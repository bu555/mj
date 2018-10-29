var RateLimit = require('express-rate-limit');
// app.enable('trust proxy'); // 只有当你使用反向代理（Heroku，Bluemix，AWS，如果你使用ELB，自定义Nginx设置等）时 

const limiter = {
    login: new RateLimit({
        windowMs: 15*60*1000, // 15 minutes
        max: 7,
        delayMs: 0, 
        // 超出限度時的處理
        // handler:function (req, res, /*next*/) {
        //   if (options.headers) {
        //     res.setHeader('Retry-After', Math.ceil(options.windowMs / 1000));
        //   }
        //   res.format({
        //     html: function(){
        //       res.status(options.statusCode).end(options.message);
        //     },
        //     json: function(){
        //       res.status(options.statusCode).json({ message: options.message });
        //     }
        //   });
        // }
    })
}

module.exports = limiter