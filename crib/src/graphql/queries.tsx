import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
query Login($email: String!, $password: String!){
  login(email: $email, password: $password) {
    user {
        _id
        firstName
        lastName
        profilePicture
        email
        unit {
            unitNumber
        }
        building {
          _id
          address
          city
          province
        }
    }
    token
  }
}
`;

export const GET_BUILDINGS = gql`
query GetBuildings {
  buildings {
    _id
    address
    city
    province
  }
}
`

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
`;