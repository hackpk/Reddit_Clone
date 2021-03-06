import { MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constant";
import {Post} from './entities/Post';
import {User} from './entities/User';
import path from  'path';

export default  {
    migrations : {
        path: path.join(__dirname,'./migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities : [Post,User],
        host:'localhost',
        dbName : 'lireddit',
        user:'reddit',
        password:'root',
        type:'postgresql',
        debug: ! __prod__,
} as Parameters<typeof MikroORM.init>[0];