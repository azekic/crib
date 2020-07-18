import React from 'react';

const commentItem = props => (
    <li key={props.commentId} className="comments__list-item">
        <div>
            <p>{props.text}</p>
        </div>
    </li>
);

export default commentItem;