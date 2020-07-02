const authResolver = require('./auth');
const postsResolver = require('./posts');
const commentResolver = require('./comment');

const rootResolver = {
    ...authResolver,
    ...postsResolver,
    ...commentResolver
};

module.exports = rootResolver;