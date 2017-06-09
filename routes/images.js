"use strict";
import images from 'images';//https://github.com/zhangyuanwei/node-images
//Cross-platform image decoder(jpg/png/jpeg/gif) and encoder(png/jpeg) for Node.js
import {Router} from 'express';
import fs from 'fs';
import path from 'path';
const router = Router();

/**
 * @api            {get}    /images/addLogo MixtureImages
 * @apiName        叠加两张图片
 * @apiGroup       Images
 * @apiDescription 给图片加水印(小图标)
 */
router.get('/addLogo', (req, res) => {
    let logImg = path.join(h.rootpath, '/public/images/redis.png');
    let targetImg = path.join(h.rootpath, '/public/images/pink.png');
    h.checkFileExist(logImg, "FileNotExist");
    h.checkFileExist(targetImg, "FileNotExist");
    let outFileName = h.basename(targetImg) + "-" + path.basename(logImg);
    let outFilePath = path.join(h.rootpath, '/public/images/', outFileName);
    images(targetImg)
        .size(1000)
        .draw(images(logImg).size(50), 10, 10)
        .save(outFilePath, {quality: 50});
    h.checkFileExist(outFilePath, "FileNotExist");
    res.json(h.S);
});


export default router;