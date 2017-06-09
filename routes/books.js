"use strict";
import wga from 'wga';
import {Book} from '../models/book';
import {Router} from 'express';
import only from 'only';
const router = Router();

/**
 * @api {get} /books  BookList
 * @apiName     获取书籍列表
 * @apiGroup    Book
 * @apiDescription  获取所有书籍列表
 */

router.get('/', wga(function* (req, res) {
	let books = yield Book.findAll();
    books = books.map( book => only(book, "name author press"));
	res.json(books);
}));



/**
 * @api {post} /books InsertBook
 * @apiName     插入一条书籍信息
 * @apiGroup    Book
 * @apiDescription  插入一条书籍信息
 * @apiParam (body) {String} name 书名
 * @apiParam (body) {String} author 作者
 * @apiParam (body) {String} press 出版社
 */
router.post('/',  wga(function* (req, res) {
    let {body: {name, author, press}} = req;
    h.assert(name && author && press, "ParameterLacked");
	let book = {name, author, press};
	let rst = yield Book.create(book);
	res.send(h.S);
}));


export default router;

