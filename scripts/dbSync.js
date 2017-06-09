"use strict";

import co from 'co';

import {Book} from '../models/book';

co(function* (){
	yield Book.sync({force: true});
	console.log('Database prepared already');
}).catch( err => console.log(err) )
