const Post = require('../../models/post');
const User = require('../../models/user');
const Comment = require('../../models/comment');
const { dateToString } = require('../../helpers/date');

const posts = async postIds => {
    try {
        const posts = await Post.find({ _id: { $in: postIds } });
        return posts;
    } catch (err) {
        throw err;
    }
};

const comments = async commentIds => {
    try {
        const comments = await Comment.find({ _id: { $in: commentIds } });
        return comments;
    } catch (err) {
        throw err;
    }
};

const singlePost = async postId => {
    try {
        const post = await Post.findById(postId);
        return transformPost(post);
    } catch (err) {
            throw err;
        }
};

const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdPosts: posts.bind(this, user._doc.createdPosts)
        }
    } catch (err) {
        throw err;
    }
};

const transformPost = post => {
    return {
        ...post._doc,
        createdAt: dateToString(post._doc.createdAt),
        updatedAt: dateToString(post._doc.updatedAt),
        author: user.bind(this, post.author),
        comments: comments.bind(this, post._doc.comments)
    };
}

const transformComment = comment => {
    return { 
        ...comment._doc, 
        createdAt: dateToString(comment._doc.createdAt),
        updatedAt: dateToString(comment._doc.updatedAt),
        user: user.bind(this, comment._doc.user),
        post: singlePost.bind(this, comment._doc.post)
     };
};

exports.transformComment = transformComment;
exports.transformPost = transformPost;

//exports.user = user;
//exports.posts = posts;
//exports.singlePost = singlePost;