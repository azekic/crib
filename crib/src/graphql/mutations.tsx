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