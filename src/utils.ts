import { Context } from "graphql-yoga/dist/types";
import { verify } from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const APP_SECRET = 'GraphQL-is-awesome'

export const getUserId = (context: Context) => {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = verify(token, APP_SECRET) as {userId: string};
        return userId
    }
    throw new GraphQLError('Not authenticated')
}