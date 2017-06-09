"use strict";
import squel from 'squel';
import Sequelize from 'sequelize';
import table from '../db';

export let Book = table.define('book', {
	name: {type: Sequelize.STRING},//数据类型
	author: {type: Sequelize.STRING},
	press: {type: Sequelize.STRING}
});
