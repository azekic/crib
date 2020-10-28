import React from 'react';
import PostItem from './PostItem/PostItem'

interface Comment {
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    text: string
}

interface User {
    _id: string,
    firstName?: string,
    lastName?: string,
    profilePicture?: string
}

interface Post {
    _id: string;
    body: string,
    images?: string[],
    likes: string,
    createdAt: Date,
    author: User,
    comments: Comment[]
}

type PostListProps = {
    posts: Array<Post>
}

const PostList = ({posts}: PostListProps) => {
    const postItems = posts.map(post => {
        return (
        <PostItem
        key={post._id}
        name={post.author.firstName + " " + post.author.lastName}
        unit="221"
        likes={post.likes}
        comments={post.comments}
        text={post.body}
        images={post.images}
        profilePicture={post.author.profilePicture ?? ""}
        />
        )
    })
    return (
        <React.Fragment>
            {postItems.reverse()}
        </React.Fragment>
    );
};

export default PostList;