import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import PostList from '../components/Posts/PostList/PostList';
import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';
import './Posts.css';

class PostsPage extends Component {
    state = {
        creating: false,
        posts: [],
        isLoading: false,
        selectedPost: null
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.bodyElRef = React.createRef();
    }

    componentDidMount() {
        this.fetchPosts();
    }

    startCreatePostHandler = () => {
        this.setState({creating: true});
    }

    modalConfirmHandler = () => {
        this.setState({creating: false});
        const title = this.titleElRef.current.value;
        const body = this.bodyElRef.current.value;

        if (title.trim().length === 0 || body.trim().length === 0){
            return;
        }

        const post = {title, body};
        console.log(post);

        const requestBody = {
            query: `
                mutation {
                    createPost(postInput: {title: "${title}", body: "${body}"}) {
                        _id
                        title
                        body
                        votes
                        createdAt
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
                Authorization: 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            this.setState(prevState => {
                const updatedPosts = [...prevState.posts];
                updatedPosts.push({
                    _id: resData.data.createPost._id,
                    title: resData.data.createPost.title,
                    body: resData.data.createPost.body,
                    votes: resData.data.createPost.votes,
                    createdAt: resData.data.createPost.createdAt,
                    author: {
                        _id: this.context.userId
                    }
                });
                return {posts: updatedPosts};
            })
        })
        .catch(err => {
            console.log(err);
        });
    };

    modalCancelHandler = () => {
        this.setState({creating: false, selectedPost: null});
    };

    fetchPosts() {
        this.setState({isLoading: true})
        const requestBody = {
            query: `
                query {
                    posts {
                        _id
                        title
                        body
                        votes
                        createdAt
                        author {
                            _id
                            email
                        }
                        comments {
                            _id
                            text
                            createdAt
                            user {
                                _id
                                email
                            }
                        }
                    }
                }
            `
        };  

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            const posts = resData.data.posts;
            this.setState({posts: posts, isLoading: false});
        })
        .catch(err => {
            console.log(err);
            this.setState({isLoading: false});
        });
    }

    showDetailHandler = postId => {
        this.setState(prevState => {
            const selectedPost = prevState.posts.find(p => p._id === postId);
            return {selectedPost: selectedPost};
        })
    }


    render() {
        return (
            <React.Fragment>
                {(this.state.creating || this.state.selectedPost) && <Backdrop />}
                {this.state.creating && 
                <Modal 
                    title="Add Post" 
                    canCancel 
                    canConfirm 
                    onCancel={this.modalCancelHandler} 
                    onConfirm={this.modalConfirmHandler}
                    confirmText="Confirm"
                >
                    <form>
                        <div className="form-control">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" ref={this.titleElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="body">Body</label>
                            <textarea id="body" rows="4" ref={this.bodyElRef}></textarea>
                        </div>
                    </form>
                </Modal>
                }
                {this.state.selectedPost && 
                <Modal 
                    title={this.state.selectedPost.title} 
                    canCancel 
                    canConfirm 
                    onCancel={this.modalCancelHandler} 
                    confirmText="Add Comment"
                >
                    <h1>{this.state.selectedPost.title}</h1>
                    <h2>{this.state.selectedPost.votes} likes - {new Date(this.state.selectedPost.createdAt).toLocaleDateString()}</h2>
                    <p>{this.state.selectedPost.body}</p>
                </Modal>
                }
            {this.context.token && 
            <div className="container action-control">
                <p>Share what you're thinking about.</p>
                <button className="btn" onClick={this.startCreatePostHandler}>Create Post</button>
            </div>
            }
            {this.state.isLoading ? 
             <Spinner /> : 
                <PostList 
                posts={this.state.posts} 
                authUserId={this.context.userId}
                onViewDetail={this.showDetailHandler}
            />
            }

            </React.Fragment>
        );
    }
}

export default PostsPage;