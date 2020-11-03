import React from 'react';
import PostItem from './PostItem/PostItem'
import { Post } from '../../../models';

type PostListProps = {
    posts: Array<Post>
}

const PostList = ({ posts }: PostListProps) => {
    const postItems = posts.map(post => {
        return (
            <PostItem
                key={post._id}
                postId={post._id}
                userId={post.author._id}
                name={post.author.firstName + " " + post.author.lastName}
                unit="221"
                likes={post.likes}
                comments={post.comments}
                text={post.body}
                images={post.images}
                profilePicture={post.author.profilePicture ?? "./img/default-user.png"}
            />
        )
    });
    return (
        <React.Fragment>
            {postItems.reverse()}
        </React.Fragment>
    );
};

export default PostList;