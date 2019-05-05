import { Prisma } from "../generated/prisma-client";
import { Context } from "graphql-yoga/dist/types";

export const links = (
    parent: {id: string},
    args: any,
    context: Context
) => {
    return (context.prisma as Prisma).user({ id: parent.id }).links()
}

export const votes = (
    parent: {id: string},
    args: any,
    context: Context
) => {
    const prisma: Prisma = context.prisma;

    return prisma.user({ id: parent.id }).votes();
}