import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Posts.css';
import { NoFragmentCyclesRule } from 'graphql';
class PostsPage extends Component {
    state = {
        creating: false
    };

    startCreateEventHandler = () => {
        this.setState({creating: true});
    }

    modalConfirmHandler = () => {
        this.setState({creating: false});

    };

    modalCancelHandler = () => {
        this.setState({creating: false});
    };

    render() {
        return (
            <React.Fragment>
                {this.state.creating && <Backdrop />}
                {this.state.creating && <Modal title="Add Post" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                <form>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title"></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="body">Body</label>
                        <textarea id="body" rows="4"></textarea>
                    </div>
                </form>
                </Modal>}
            <div className="posts-control">
                <p>Share what you're thinking about.</p>
                <button className="btn" onClick={this.startCreateEventHandler}>Create Post</button>
            </div>
            </React.Fragment>
        );
    }
}

export default PostsPage;