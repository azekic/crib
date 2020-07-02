const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Comment {
    _id: ID!
    post: Post!
    user: User!
    createdAt: String!
    updatedAt: String!
    text: String!
}

type Post {
    _id: ID!
    title: String!
    body: String!
    votes: Int!
    createdAt: String!
    updatedAt: String!
    author: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdPosts: [Post!]
}

input PostInput {
    title: String!
    body: String!
    votes: Int!
}

input UserInput {
    email: String!
    password: String!
}

input CommentInput {
    postId: ID!
    text: String!
}

type RootQuery {
    posts: [Post!]!
    comments: [Comment!]!
}

type RootMutation {
    createPost(postInput: PostInput): Post
    createUser(userInput: UserInput): User
    addComment(commentInput: CommentInput): Comment!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);