const Like = require('../../models/like');
const Post = require('../../models/post');
const User = require('../../models/user');
const Comment = require('../../models/comment');
const {transformPost, transformUser} = require('./merge');

module.exports = {
    posts: async () => {
        try {
            const posts = await Post.find();
            return posts
                .map(post => {
                    return transformPost(post);
                });
        } catch (err) {
            throw err;
        }
    },
    createPost: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const post = new Post({
            body: args.postInput.body,
            author: req.userId,
            images: args.postInput.images
        });
        let createdPost;
        try {
            const result = await post.save();
            createdPost = transformPost(result);
            const author = await User.findById(req.userId);
            if (!author) {
                throw new Error("Author not found");
            }
            author.createdPosts.push(post);
            await author.save();
            return createdPost;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    deletePost: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const post = await Post.findById(args.postId);

            if (post.author._id != req.userId) {
                throw new Error('Post does not belong to user');
            }
            for (like of post.likes){
                await Like.findByIdAndDelete(like._id);
            }
            for (comment of post.comments){
                await Comment.findByIdAndDelete(comment._id);
            }
            await Post.findByIdAndDelete(args.postId);

            return await User.findById(args.userId);

        } catch (err) {
            throw err;
        }
    }
}