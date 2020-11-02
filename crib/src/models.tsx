export interface User {
    _id: string,
    firstName?: string,
    lastName?: string,
    profilePicture?: string
  }
  
  export interface Comment {
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    text: string,
    user: User
  }
  export interface Post {
    _id: string;
    body: string,
    images?: string[],
    likes: Like[],
    createdAt: Date,
    author: User,
    comments: Comment[]
  }

  export interface Like {
    _id: string,
    user: User,
    post: Post
  }