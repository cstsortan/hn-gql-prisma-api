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