import "reflect-metadata";
import { MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constant";
import micrConfig from './mikro-orm.config';
import express from 'express';
import {buildSchema} from 'type-graphql';
import {ApolloServer} from 'apollo-server-express';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/Post";
import { UserResolver } from "./resolvers/user";
 
const main = async() =>{
    const orm =  await MikroORM.init(micrConfig);
    await orm.getMigrator().up();
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver,PostResolver,UserResolver],
            validate: false,
        }),

        context: () =>({em:orm.em})
    })

    apolloServer.applyMiddleware({app})
    //we gonna use apollo server gra
    // app.get('/',(_,res) =>{
    //     res.send("hello pk")
    // })

    app.listen(4000, ()=>{
        console.log('server started on localhost');
    })
    // const post = orm.em.create(Post ,{title: 'my first post'});
    // await orm.em.persistAndFlush(post);

    // const posts =await orm.em.find(Post,{});
    // console.log(posts);

}

main().catch((err)=>{
    console.error(err);
});

