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
}

type Link {
	id: ID!
	description: String!
	url: String!
}
`

export default schema;