import { GraphQLServer } from 'graphql-yoga'
import schema from './schema';
import { Prisma, prisma } from './generated/prisma-client';
import * as Query from './resolvers/Query';
import * as Mutation from './resolvers/Mutation';
import * as Link from './resolvers/Link';
import * as User from './resolvers/User';
import * as Subscription from './resolvers/Subscription';


const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
}

const server = new GraphQLServer({
    typeDefs: schema,
    resolvers,
    context: request => ({ prisma, ...request }),
})

server.start(() => console.log(`Server is running on http://localhost:4000`));