import {gql} from '@apollo/client';

export const ADD_COMMENT = gql`
mutation ($postId: ID!, $text: String!){
    addComment(commentInput: {postId: $postId, text: $text}) {
        _id
        text
    }
}
`;

export const CREATE_POST = gql`
mutation CreatePost($body: String!, $imgUrls: [String]){
    createPost(postInput: {body: $body, images: $imgUrls}) {
        _id
        body
        likes {
            _id
        }
        createdAt
        images
    }
}
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!){
    deletePost(postId: $postId) {
      _id
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!){
    likePost(postId: $postId) {
      _id
      user {
        _id
      }
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnLikePost($likeId: ID!){
    unLikePost(likeId: $likeId) {
      _id
      likes {
        _id
        user {
          _id
        }
      }
    }
  }
`;

export const CREATE_USER = gql`
    mutation CreateUser($email: String!, $password: String!, $firstName: String!, $lastName: String!){
        createUser(userInput: {email: $email, password: $password, firstName: $firstName, lastName: $lastName}) {
            _id
            email
            firstName
            lastName
        }
    }
`;

export const UPDATE_PROFILE_PICTURE = gql`
mutation UpdateProfilePicture($profilePicture: String!){
    updateProfilePicture(updateProfilePictureInput: {profilePicture: $profilePicture}) {
        profilePicture
    }
}
`;

export const ADD_UNIT = gql`
mutation AddUnit($buildingId: ID!, $unitNumber: Int!){
  addUnit(unitInput: {buildingId: $buildingId, unitNumber: $unitNumber}) {
    unitNumber
  }
}
`;

export const ADD_BUILDING = gql`
mutation AddBuilding($address: String!, $city: String!, $province: String!){
  addBuilding(buildingInput: {address: $address, city: $city, province: $province}) {
    _id
  }
}
`;

export const SET_BUILDING = gql`
mutation SetBuilding($buildingId: ID!){
  setBuilding(buildingId: $buildingId) {
    building {
      _id
      address
    }
  }
}
`