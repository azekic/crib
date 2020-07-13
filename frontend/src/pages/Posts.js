import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import './Posts.css';

class PostsPage extends Component {
    state = {
        creating: false,
        posts: []
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
                        author {
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
                Authorization: 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            this.fetchPosts();
        })
        .catch(err => {
            console.log(err);
        });
    };

    modalCancelHandler = () => {
        this.setState({creating: false});
    };

    fetchPosts() {
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
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            const posts = resData.data.posts;
            this.setState({posts: posts});
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        const postList = this.state.posts.map(post => {
        return <li key={post._id} className="posts__list-item">{post.title}</li>;
        });

        return (
            <React.Fragment>
                {this.state.creating && <Backdrop />}
                {this.state.creating && <Modal title="Add Post" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
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
                </Modal>}
            {this.context.token && 
            <div className="posts-control">
                <p>Share what you're thinking about.</p>
                <button className="btn" onClick={this.startCreatePostHandler}>Create Post</button>
            </div>
            }
            <ul className="posts__list">
                {postList}
            </ul>
            </React.Fragment>
        );
    }
}

export default PostsPage;