import { Prisma, Link, LinkWhereInput } from "../generated/prisma-client";
import { Context } from "graphql-yoga/dist/types";

export const link = (parent: any, args: {id: string}, context: {prisma: Prisma}): Promise<Link|null> => {
    return context.prisma.link({
        id: args.id,
    })
}

export const feed = async (parent: any, args: any, context: Context): Promise<any> => {
    const prisma = context.prisma as Prisma;

    const where: LinkWhereInput = args.filter ? {
        OR: [{
            description_contains: args.filter,
        },
        {
            url_contains: args.filter
        }],
    } : {}
    const links = await prisma.links({
        where,
        first: args.first,
        skip: args.skip,
        orderBy: args.orderBy,
    })

    const count = await prisma.linksConnection({ where }).aggregate().count()

    return {
        links,
        count,
    }
}
