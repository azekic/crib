const authResolver = require('./auth');
const postsResolver = require('./posts');
const commentResolver = require('./comment');
const buildingResolver = require('./building');
const amenityResolver = require ('./amenity');
const unitResolver = require('./unit');

const rootResolver = {
    ...authResolver,
    ...postsResolver,
    ...commentResolver,
    ...buildingResolver,
    ...unitResolver,
    ...amenityResolver
};

module.exports = rootResolver;