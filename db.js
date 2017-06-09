"use strict";
import Sequelize from "sequelize";
import fs from 'fs';

// const SQLLogDirectory = path.join(__dirname, '/sqlLogs');
// fs.existsSync(SQLLogDirectory) || fs.mkdirSync(SQLLogDirectory);

//数据库连接
const sequelize = new Sequelize(
	'test',    //数据库
	'root',    //数据库 用户名
	'',        //此处的密码为空
	{
		'dialect': 'mysql',
		'host': 'localhost',
		'port': 3306,
        'logging':false //不打印sql 操作日志
	}
);

export default sequelize;
