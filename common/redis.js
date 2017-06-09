"use strict";

import {redis AS redisConfig} from '../config.json';

export default function(app, session){
    const redisStore = require('connect-redis')(session);
    app.use(session({
        store: new redisStore(redisConfig),
        secret: 'hully test',
        cookie: {maxAge: 1000 * 60}
    }))
}