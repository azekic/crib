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
    comments: [Comment!]
}

type User {
    _id: ID!
    email: String!
    password: String
    createdPosts: [Post!]
    unit: Unit
}

type Building {
    _id: ID!
    address: String!
    city: String!
    province: String!
}
 
type Unit {
    _id: ID!
    unitNumber: Int!
    building: Building!
    occupant: User
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input PostInput {
    title: String!
    body: String!
}

input UserInput {
    email: String!
    password: String!
}

input UnitInput {
    buildingId: ID!
    unitNumber: Int!
}

input BuildingInput{
    address: String!
    city: String!
    province: String!
}

input CommentInput {
    postId: ID!
    text: String!
}

type RootQuery {
    posts: [Post!]!
    comments: [Comment!]!
    buildings: [Building!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createPost(postInput: PostInput): Post
    createUser(userInput: UserInput): User
    addUnit(unitInput: UnitInput): Unit!
    addBuilding(buildingInput: BuildingInput): Building
    addComment(commentInput: CommentInput): Comment!
    deleteComment(commentId: ID!): Post!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);