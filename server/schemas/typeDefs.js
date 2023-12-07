const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [String]!
}
type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Auth {
    token: ID!
    user: User!
}

type Query {
    user: [User]!
    user(UserId: ID!): User
    me:User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!)
    saveBook(book: BookInput!): User
    removeBook(bookId: ID!): User
}
`
module.exports = typeDefs