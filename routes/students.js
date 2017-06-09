"use strict";
import wga from 'wga';
import {Student} from '../models/student';
import {Router} from 'express';
const router = Router();


/**
 * @api {get} /students  StudentList
 * @apiName     获取学生信息列表
 * @apiGroup    Student
 * @apiDescription  获取所有学生信息列表
 *
 */

router.get('/',wga(function* (req, res) {
	let student = yield Student.findAll();
	res.json(student);
}));


export default router;
