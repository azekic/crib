const Post = require('../../models/post');
const User = require('../../models/user');
const Like = require('../../models/like');
const {transformPost, transformLike} = require('./merge');

module.exports = {
    unLikePost: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const like = await Like.findById(args.likeId).populate('post');
            const post = like.post;
            post.likes.pull({_id: args.likeId});
            await Like.findByIdAndDelete(args.likeId);
            const result = await post.save();
            return result;
        } catch (err) {
            throw err;
        }
    },

    likePost: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        const fetchedPost = await Post.findById(args.postId);

        if (!fetchedPost) {
            throw new Error("Post not found");
        }
        if (fetchedPost.likes.find(l => l.user._id == req.userId)) {
            throw new Error("Post already liked");
        }       
        
        const like = new Like({
            post: args.postId,
            user: req.userId
        });

        try {
            fetchedPost.likes.push(like);
            await fetchedPost.save();
            const result = await like.save();
            return transformLike(result);
        }
        catch (err) {
            throw err;
        }
    }


}