var log4js = require('log4js');


// log4js.configure({
//   appenders: [
//     { type: 'console' }, //控制台输出
//     {
//       type: 'file', //文件输出
//       filename: 'logs/access.log',
//       maxLogSize: 1024,
//       backups:3,
//       category: 'normal'
//     }
//   ]
// });
// var logger = log4js.getLogger('normal');
// logger.setLevel('ERROR');
// app.use(log4js.connectLogger(logger));



log4js.configure({
    appenders: [
        {
            type: 'console',
            category: "console"

        }, //控制台输出
        {
            type: "dateFile",
            filename: 'logs/log',
            pattern: "_yyyyMMdd.log",
            // absolute: false,
            alwaysIncludePattern: true,
            // maxLogSize: 20480,
            // backups: 3,
            category: 'logError'

        }//日期文件格式
    ],
    replaceConsole: true,   //替换console.log
    levels:{
        logError: 'error', //error及以上级别输出到日志文件
        logInfo: 'info', //info及以上级别输出
        console: 'debug' //debug及以上级别输出到控制台
    }
});

// const logger = log4js.getLogger('logInfo'); 
// const logger2 = log4js.getLogger('console'); 
// logger2.debug('hello 校的事发生');
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('盛大发售');

module.exports = log4js