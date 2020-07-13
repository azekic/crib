import React from 'react';
import './PostList.css';

import PostItem from './PostItem/PostItem';
const postList = props => {
    const posts = props.posts.map(post => {
        return (
            <PostItem key={post._id} postId={post._id} title={post.title} />
            );
        });
    return (
    <ul className="post__list">
        {posts}
    </ul>
    );
};

export default postList;;