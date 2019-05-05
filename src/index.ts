import { GraphQLServer } from 'graphql-yoga'
import schema from './schema';
import { GraphQLError, ArgumentNode, ValidationContext } from 'graphql';

import { Prisma, prisma } from './generated/prisma-client';

interface Link {
    id: string;
    description?: string;
    url: string;
}

const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Clone',
        feed: (parent: any, args: any, context: {prisma: Prisma}) => context.prisma.links(),
        link: (parent: any, args: {id: string}, context: {prisma: Prisma}) => {
            return context.prisma.link({
                id: args.id,
            });
        }
    },
    Mutation: {
        post: (parent: Link, args: any, context: {prisma: Prisma}) => {
            return context.prisma.createLink({
                description: args.description,
                url: args.url,
            });
        },
        // updateLink: (parent: Link, args: {id: string}) => {
        //     const i = links.map(l => l.id).indexOf(args.id);

        //     if (i>-1) {
        //         links[i] = {
        //             ...links[i],
        //             ...args,
        //         };
        //         return links[i]
        //     }
        //     return new GraphQLError(`Link with id='${args.id}' not found`)
        // },
        // deleteLink: (parent: Link, args: {id: string}) => {
        //     const i = links.map(l => l.id).indexOf(args.id);

        //     if (i < 0) {
        //         return new GraphQLError(`Link with id='${args.id}' not found`)
        //     }
        //     const link = links[i]
        //     links = links.filter(l => l.id !== args.id)
        //     return link
        // }
    }
}

const server = new GraphQLServer({
    typeDefs: schema,
    resolvers,
    context: { prisma },
})

server.start(() => console.log(`Server is running on http://localhost:4000`));