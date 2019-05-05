const gql = String.raw;

const schema = gql`
type Query {
	info: String
	feed(filter: String, start: Int, first: Int, orderBy: LinkOrderByInput): feed!
	link(id: ID): Link
}

type feed {
	links: [Link!]!
	count: Int!
}

enum LinkOrderByInput {
  description_ASC
  description_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
}

type Mutation {
	post(url: String!, description: String!): Link!
	updateLink(id: ID!, description: String, url: String): Link
	deleteLink(id: ID!): Link
	signup(email: String!, password: String!, name: String!): AuthPayload
	signin(email: String!, password: String!): AuthPayload
	vote(linkId: ID!): Vote
}

type Subscription {
	newLink: Link
	newVote: Vote
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
	votes: [Vote!]!
	votesCount: Int!
}

type User {
	id: ID!
	name: String!
	email: String!
	links: [Link!]!
	votes: [Vote!]!
}

type Vote {
	id: ID!
	link: Link!
	user: User!
}
`

export default schema;