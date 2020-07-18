const Post = require('../../models/post');
const Comment = require('../../models/comment');
const { transformComment } = require('./merge');

module.exports = {

    comments: async () => {
        try {
            const comments = await Comment.find();
            return comments.map(comment => {
                return transformComment(comment);
            })
        } catch (err) {
            throw err;
        }
    },

    addComment: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const fetchedPost = await Post.findOne({_id: args.commentInput.postId});
        if (!fetchedPost) {
            throw new Error("Post not found");
        }
        const comment = new Comment({
            user: req.userId,
            post: fetchedPost,
            text: args.commentInput.text
        });
        try {
            fetchedPost.comments.push(comment);
            await fetchedPost.save();
            const result = await comment.save();
            return transformComment(result);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}