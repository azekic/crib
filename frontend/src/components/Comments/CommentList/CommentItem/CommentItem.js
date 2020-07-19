import React from 'react';
import './CommentItem.css';

const commentItem = props => (
    <li key={props.commentId} className="comment__item">
        <div className="comment__item-data">
            <div className="comment__item-user"><b>{props.user.email}</b></div>
            <div className="comment__item-text">{props.text}</div>
        </div>
        <div className="comment__item-actions">
            <button className="btn" onClick={props.onDelete.bind(this, props.commentId)}>Delete</button>
        </div>

    </li>
);

export default commentItem;