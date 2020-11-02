import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
query Login($email: String!, $password: String!){
  login(email: $email, password: $password) {
    userId
    token
  }
}
`;

export const GET_POSTS = gql`
query GetPosts {
    posts {
        _id
        body
        likes {
          _id
          user {
            _id
          }
        }
        createdAt
        author {
            _id
            email
            firstName
            lastName
            profilePicture
        }
        comments {
            _id
            text
            createdAt
            user {
                _id
                firstName
                lastName
                profilePicture
            }
        }
        images
    }
  }
`