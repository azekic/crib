import React, {Component} from 'react';

import CommentItem from './CommentItem/CommentItem';
import AuthContext from '../../../context/auth-context';
import './CommentList.css'
class CommentList extends Component {

    constructor(props) {
        super(props);
    };
    
    render () {
        const comments = this.props.comments.map(comment => {
            return (
                <CommentItem 
                    key={comment._id}
                    commentId={comment._id}
                    text={comment.text}
                    user={comment.user}
                    onDelete={this.props.deleteCommentHandler}
                />
            );
        });
        return (
            <ul className="comment__list">
                {comments}
            </ul>
        )
    };
}

export default CommentList;