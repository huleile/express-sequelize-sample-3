"use strict";

import {Router} from 'express';
import _ from 'lodash';//https://lodash.com/docs/4.16.6

const router = Router();

/**
 * @api            {get}    /lodashes/chunk DivideArray
 * @apiName        分割数组
 * @apiGroup       Lodashes
 * @apiDescription 将数组按照定长分割成N个数组
 */
router.get('/chunk', (req, res) => {
    let arr = [1, 2, 3, 4, 5, 6, 7];
    res.json(h.r(_.chunk(arr, 3)));
})

export default router;