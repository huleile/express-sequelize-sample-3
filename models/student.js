"use strict";
import squel from 'squel';
import Sequelize from 'sequelize';
import table from '../db';

export let Student = table.define('student', {
	name: {type: Sequelize.STRING},//数据类型
	age: {type: Sequelize.INTEGER}
});
