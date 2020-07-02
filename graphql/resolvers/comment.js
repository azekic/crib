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

    addComment: async args => {
        const fetchedPost = await Post.findOne({_id: args.commentInput.postId});
        const comment = new Comment({
            user: '5efdeabc49d99f564c9d9fa1',
            post: fetchedPost,
            text: args.commentInput.text
        });
        const result = await comment.save();
        return transformComment(result);
    }
}