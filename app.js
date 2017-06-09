"use strict";
import http from 'http';
import express from "express";
import path from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import redis from 'redis';
import FileStreamRotator  from 'file-stream-rotator';
import fs from 'fs';
import ejs from 'ejs';
import {exec} from 'child_process';
import routes from './routes/index';

require('./common/helper');
const RedisStore = require('connect-redis')(session);
const app = express();

h.rootpath = path.join(__dirname);

app.set('port', process.env.PORT || 3001);

//静态资源 与 视图
app.use(favicon(path.join(__dirname, '/public/images/butterfly.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/public/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//http request param resolve
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//req validator
app.use(validator());

// session and cookie
app.use(cookieParser());
// session 存放在内存中
// app.use(session({
//     secret: 'hully test',
//     cookie: {maxAge: 1000 * 60 * 60}
// }));
// session 存放于 redis 中
const redisConfig = {
    "host": '127.0.0.1',
    "port": 6379,
    "redisdb": 1,
    "ttl": 120//有效期为2分钟
}
app.use(session({
    store: new RedisStore(redisConfig),
    secret: 'hully test',
    cookie: {maxAge: 1000 * 60}
}))

//visit log 2 file.log daily
//ensure log directory exists
const logDirectory = path.join(__dirname, '/logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
//create a rotating write stream
const accessLogStream = FileStreamRotator.getStream( {
    filename: path.join(logDirectory, '/access-%DATE%.log'),
    date_format: "YYYY-MM-DD",//日期格式配合前边的DATE进行使用
    frequency: 'daily',// 频率
    verbose: false
});
// morgan print-format (combined common dev short tiny)
// sure, you also use custom print-format 
const logStyle = '[:date[iso]]: [":http-version"-":method"- ":url" :status ] ":user-agent" :response-time ms';
app.use(morgan(logStyle, {stream: accessLogStream}));
// app.use(morgan(logStyle));
// 设置跨域访问
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.header("X-Powered-By",' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// route set
routes(app);

//grunt apidoc
exec('grunt', (err, stdout, stderr) => {
    if(!err){
        console.log(stdout);
    }else{
        console.log(stderr);
        throw err;
    }
});

//404
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});


process.on('uncaughtException', err => console.error(err.stack));
process.on('unhandledRejection', (err, p) => console.error(err.stack));

let server = http.createServer(app).listen(app.get('port'), () => {
	let host = server.address().address;
	console.log("服务启动成功，访问地址为 http://%s:%s", host, app.get('port'));
});
