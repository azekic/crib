const authResolver = require('./auth');
const postsResolver = require('./posts');
const commentResolver = require('./comment');
const buildingResolver = require('./building');
const unitResolver = require('./unit');

const rootResolver = {
    ...authResolver,
    ...postsResolver,
    ...commentResolver,
    ...buildingResolver,
    ...unitResolver
};

module.exports = rootResolver;