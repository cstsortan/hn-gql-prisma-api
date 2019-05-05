import { Prisma, Link } from '../generated/prisma-client';
import { Context } from 'graphql-yoga/dist/types';
import { getUserId, APP_SECRET } from '../utils';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
import { GraphQLError } from 'graphql';

export const signup = async (
    parent: any, 
    args: {email: string, password: string, name: string},
    context: {prisma: Prisma},
) => {

    // Checks if there's already a user with this email
    const existingUser = await context.prisma.user({
        email: args.email,
    })
    if (existingUser) {
        throw new GraphQLError("Email already exists")
    }

    // Hashing password
    const hashedPassword = await hash(args.password, 12);

    // Creating user in database
    const user = await context.prisma.createUser({
        email: args.email,
        name: args.name,
        password: hashedPassword,
    });

    // Generate auth token (JWT)
    const token = await sign({ userId: user.id }, APP_SECRET);

    return {
        user,
        token,
    };
}

export const signin = async (
    parent: any,
    args: {email: string, password: string},
    context: {prisma: Prisma},
) => {

    // Check if user exists
    const user = await context.prisma.user({
        email: args.email
    });
    if (!user) {
        throw new GraphQLError("No user found with this email")
    }

    // Validate password
    const isValid = await compare(args.password, user.password);
    if  (!isValid) {
        throw new GraphQLError("Invalid password");
    }

    // Generate auth token (JWT)
    const token = sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

export const post = (parent: Link, args: any, context: Context) => {
    const userId = getUserId(context);
    const prisma: Prisma = context.prisma;
    return prisma.createLink({
        description: args.description,
        url: args.url,
        author: { connect: {id: userId}}
    })
}

export const updateLink = (parent: Link, args: {id: string, url: string, description: string}, context: {prisma: Prisma}) => {
    return context.prisma.updateLink({
        data: {
            url: args.url,
            description: args.description,
        },
        where: {
            id: args.id
        }
    })
}

export const deleteLink = (parent: Link, args: {id: string}, context: {prisma: Prisma}) => {
    return context.prisma.deleteLink({
        id: args.id,
    })
}