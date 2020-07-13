const Post = require('../../models/post');
const User = require('../../models/user');
const {transformPost} = require('./merge');

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
            title: args.postInput.title,
            body: args.postInput.body,
            author: req.userId
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
    }
}