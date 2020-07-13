import React from 'react';
import './PostItem.css';

const postItem = props => (
    <li key={props.postId} className="posts__list-item">
        {props.title}
    </li>
);

export default postItem;