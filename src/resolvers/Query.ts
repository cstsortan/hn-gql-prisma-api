import { Prisma, Link } from "../generated/prisma-client";
import { Context } from "graphql-yoga/dist/types";

export const link = (parent: any, args: {id: string}, context: {prisma: Prisma}): Promise<Link|null> => {
    return context.prisma.link({
        id: args.id,
    })
}

export const feed = (parent: any, args: any, context: Context): Promise<Link[]> => {
    const prisma = context.prisma as Prisma;
    return prisma.links();
}
