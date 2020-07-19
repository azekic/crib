import React, {Component} from 'react';
import './PostItem.css';
import CommentList from '../../../Comments/CommentList/CommentList';
import AuthContext from '../../../../context/auth-context';
import Spinner from '../../../../components/Spinner/Spinner';


class PostItem extends Component {
    state = {
        comments: this.props.comments,
        isLoading: false
    }
    constructor(props) {
        super(props);
        this.textElRef = React.createRef();
    };
    static contextType = AuthContext;

    addCommentHandler = () => {
        const requestBody = {
            query: `
                mutation {
                    addComment(commentInput:{postId: "${this.props.postId}", text: "${this.textElRef.current.value}"}) {
                        _id
                        text
                        createdAt
                        updatedAt
                        user {
                            _id
                            email
                        }
                    }
                }
            `
        };

        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            this.setState(prevState => {
                const updatedComments = [...prevState.comments];
                updatedComments.push({
                    _id: resData.data.addComment._id,
                    text: resData.data.addComment.text,
                    createdAt: resData.data.addComment.createdAt,
                    user: resData.data.addComment.user
                });
                this.textElRef.current.value = "";
                return {comments: updatedComments};
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({isLoading: false});
        });

    }

    deleteCommentHandler = commentId => {
        const requestBody = {
            query: `
                mutation {
                    deleteComment(commentId: "${commentId}") {
                        _id
                        title
                    }
                }
            `
        };

        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            this.setState(prevState => {
                const updatedComments = prevState.comments.filter(comment => {
                    return comment._id !== commentId;
                });
                return {comments: updatedComments};
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    render () {
        return (
    <li key={this.props.postId} className="posts__list-item">
        <div className="posts__list-item__top">
            <div>
                <h1>{this.props.title}</h1>
                {this.props.userId === this.props.creatorId && <h2>Created by you</h2>}
                <h2>{this.props.votes} likes - {new Date(this.props.createdAt).toLocaleDateString()}</h2>
                <div className="posts_list-item__body">{this.props.body}</div>
            </div>
            {/* <div>
                <button className="btn" onClick={props.onDetail.bind(this, props.postId)}>Show more</button>
            </div> */}
        </div>
        {this.props.comments !== null && (
        <div className="posts_list-item__comments">
            
            <h2>Comments</h2>
            {this.state.isLoading ? 
             <Spinner /> : 
             <CommentList 
                comments={this.state.comments}
                deleteCommentHandler={this.deleteCommentHandler}
            />
            }
            
        </div> )
        }
        <form>
            <div className="form-control">
                <textarea id="text" rows="4" ref={this.textElRef} ></textarea>
            </div>
        </form>
        <button className="btn" onClick={this.addCommentHandler}>Add Comment</button>

        
    </li>
        )};
}
export default PostItem;