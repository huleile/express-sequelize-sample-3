"use strict";
import fs from 'fs';
import path from 'path';


const errCode = {

    "ParameterLacked": {
        code: 400100,
        message: "Parameter lacked"
    },

    "FileNotExist": {
        code: 400200,
        messahe: "File Not Exist"
    }

}



const h = {
    r (data){
        return {code: 200, data};
    },

    S: {code: 200, message: "success"},

    checkInputError (errors, code){
        if(errors.length){
            const msg = errors[0].msg; //use the first error
            const err = new Error(mgs);
            err.code = errCode[mgs].code;
            throw err;
        }
    },

    assert (data, message, code){
        if(!data){
            const err = new Error(message);
            err.code = errCode[message].code;
            throw err;
        }
    },

    checkFileExist (path, message, code){
        if(!fs.existsSync(path)){
            const err = new Error(message);
            err.code = errCode[message].code;
            throw err;
        }
    },

    basename (filepath){
        let extname = path.extname(filepath);
        let basename = path.basename(filepath, extname);
        return basename;
    }
}

global.h = h;

export default h;