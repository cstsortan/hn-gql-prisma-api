import { Prisma, Link } from "../generated/prisma-client";
import { Context } from "graphql-yoga/dist/types";

export const author = (
    parent: {id: string},
    args: any,
    context: Context
) => {
    const prisma: Prisma = context.prisma;

    return prisma.link({ id: parent.id }).author();
}

export const votes = (
    parent: {id: string},
    args: any,
    context: Context
) => {
    const prisma: Prisma = context.prisma;

    return prisma.link({ id: parent.id }).votes()
}

export const votesCount = async (
    parent: {id: string},
    args: any,
    context: Context
) => {
    const votes = await (context.prisma as Prisma).votes({ where: {link: {id: parent.id}} });
    return votes.length;
}
