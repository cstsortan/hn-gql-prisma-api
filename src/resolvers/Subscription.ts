import { Context } from "graphql-yoga/dist/types";
import { Prisma } from "../generated/prisma-client";

const newLinkSubscribe = (
    parent: any,
    args: any,
    context: Context,
) => {
    const prisma: Prisma = context.prisma;
    
    return prisma.$subscribe.link({ mutation_in: 'CREATED' }).node()
}

export const newLink = {
    subscribe: newLinkSubscribe,
    resolve: (payload: any) => payload,
}

const newVoteSubscribe = (
    parent: any,
    args: any,
    context: Context,
) => {
    const prisma: Prisma = context.prisma

    return prisma.$subscribe.vote({ mutation_in: 'CREATED' }).node()
}
  

export const newVote = {
    subscribe: newVoteSubscribe,
    resolve: (payload: any) => payload,
};