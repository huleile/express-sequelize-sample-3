"use strict";
import path from 'path';
import fs from 'fs';
import mime from 'mime';
const bname = path.basename(module.filename);
const routesPath = path.dirname(__dirname + '/routes/');

export default function(app){

	//session
	app.get('/', (req, res) => {
		let content = 'Welcome to Beijing';
		if(req.session.isVisit){
			req.session.isVisit++;
			content = '第 ' + req.session.isVisit + ' 次访问';
		}else{
			req.session.isVisit = 1;
			content = '欢迎第一次访问';
		}
		res.render('index', {content})
	});	

	//cookie 
	// app.get('/', (req, res) => {
	// 	let content = 'Welcome to Beijing';
	// 	if(req.cookies.isVisit) {
	// 		content = '欢迎再次访问';
	// 	}else {
	// 		res.cookie('isVisit', 1, {maxAge: 60 * 1000});
	// 		content = '欢迎第一次访问';
	// 	}
	// 	res.render('index', {content})
	// });	

	fs.readdirSync(routesPath)
	.filter( file => file !== bname)
	.filter( file => path.extname(file) == '.js')
	.forEach(file => {
		let basename = path.basename(file,'.js');
		// if(basename !== 'index'){
		if(!basename.includes('index')){
			//注意此处只能使用require实现动态加载模块
			//import加载为静态加载，只能放在文件的开始进行加载
			const route = require(path.join(routesPath,basename)).default;
			// route(app);
			app.use('/' + basename, route);
		}
	});
}