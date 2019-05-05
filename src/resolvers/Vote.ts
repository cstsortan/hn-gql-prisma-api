import { Context } from "graphql-yoga/dist/types";
import { Prisma } from "../generated/prisma-client";

export const user = (
    parent: {id: string},
    args: any,
    context: Context
) => {
    const prisma: Prisma = context.prisma;

    return prisma.vote({ id: parent.id }).user();
}

export const link = (
    parent: {id: string},
    args: any,
    context: Context
) => {
    const prisma: Prisma = context.prisma;

    return prisma.vote({ id: parent.id }).link();
}