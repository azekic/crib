import React from 'react';

import CommentItem from './CommentItem/CommentItem';

import './CommentList.css'
const commentList = props => {
    const comments = props.comments.map(comment => {
        return (
            <CommentItem 
                key={comment._id}
                commentId={comment._id}
                text={comment.text}
            />
        );
    });

    return (
        <ul className="comment__list">
            {comments}
        </ul>
    );
    
}

export default commentList;