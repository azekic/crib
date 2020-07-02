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
    createPost: async args => {
        const post = new Post({
            title: args.postInput.title,
            body: args.postInput.body,
            votes: args.postInput.votes,
            author: '5efdeabc49d99f564c9d9fa1'
        });
        let createdPost;
        try {
            const result = await post.save();
            createdPost = transformPost(result);
            const author = await User.findById('5efdeabc49d99f564c9d9fa1');
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