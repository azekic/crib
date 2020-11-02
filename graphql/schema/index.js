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

type Like {
    _id: ID!
    user: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
}

type Post {
    _id: ID!
    body: String!
    likes: [Like!]
    createdAt: String!
    updatedAt: String!
    author: User!
    comments: [Comment!]
    images: [String]
}

type User {
    _id: ID!
    email: String!
    password: String
    createdPosts: [Post!]
    unit: Unit!
    firstName: String!
    lastName: String!
    profilePicture: String
}

type Amenity {
    _id: ID!
    name: String!
    image: String
    troubleshoots: [Troubleshoot!]
}

type Troubleshoot {
    id: ID!
    amenity: Amenity!
    name: String!
    description: String!
    solution: String!
}

type ReportedIssue {
    id: ID!
    createdAt: String!
    updatedAt: String!
    resolved: Boolean!
    description: String!
    troubleshoot: Troubleshoot!
    unit: Unit!
    user: User!
    photo: String
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
    reportedIssues: [ReportedIssue]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input PostInput {
    body: String!
    images: [String]
}

input UserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    profilePicture: String
}

input UpdateProfilePictureInput {
    profilePicture: String!
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

input LikeInput {
    postId: ID!
}

input TroubleshootInput {
    amenityId: ID!
    name: String!
    description: String!
    solution: String!
}

input ReportedIssueInput {
    description: String!
    troubleshootId: ID!
    photo: String
}

input AmenityInput {
    name: String,
    image: String
}

type RootQuery {
    posts: [Post!]!
    likes: [Like!]!
    comments: [Comment!]!
    buildings: [Building!]!
    login(email: String!, password: String!): AuthData!
    unit: Unit
    amenities: [Amenity!]!
    reportedIssues: [ReportedIssue!]!
    troubleshoots: [Troubleshoot!]!
}

type RootMutation {
    createPost(postInput: PostInput): Post
    deletePost(postId: ID!): User
    createUser(userInput: UserInput): User
    updateProfilePicture(updateProfilePictureInput: UpdateProfilePictureInput): User
    addUnit(unitInput: UnitInput): Unit!
    addBuilding(buildingInput: BuildingInput): Building
    addComment(commentInput: CommentInput): Comment!
    unLikePost(likeId: ID!): Post!
    likePost(postId: ID!): Like!
    deleteComment(commentId: ID!): Post!
    addTroubleshoot(troubleshootInput: TroubleshootInput): Troubleshoot!
    addReportedIssue(reportedIssueInput: ReportedIssueInput): ReportedIssue!
    addAmenity(amenityInput: AmenityInput): Amenity!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);