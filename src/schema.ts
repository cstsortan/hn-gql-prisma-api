const gql = String.raw;

const schema = gql`
type Query {
	info: String
	feed: [Link!]!
	link(id: ID): Link
}

type Mutation {
	post(url: String!, description: String!): Link!
	updateLink(id: ID!, description: String, url: String): Link
	deleteLink(id: ID!): Link
	signup(email: String!, password: String!, name: String!): AuthPayload
	signin(email: String!, password: String!): AuthPayload
}

type Subscription {
	newLink: Link
}

type AuthPayload {
	token: String
	user: User
}

type Link {
	id: ID!
	description: String!
	url: String!
	author: User
}

type User {
	id: ID!
	name: String!
	email: String!
	links: [Link!]!
}
`

export default schema;