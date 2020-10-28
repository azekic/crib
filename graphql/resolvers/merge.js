const DataLoader = require('dataloader');

const Post = require('../../models/post');
const User = require('../../models/user');
const Comment = require('../../models/comment');
const Unit = require('../../models/unit');
const Building = require('../../models/building');
const ReportedIssue = require('../../models/reportedIssue');
const { dateToString } = require('../../helpers/date');

const postLoader = new DataLoader((postIds) => {
    return posts(postIds);
});

const userLoader = new DataLoader((userIds) => {
    return User.find({_id: {$in: userIds}});
});

const buildingLoader = new DataLoader((buildingIds) => {
    return Building.find({_id: {$in: buildingIds}});
});

const unitLoader = new DataLoader((unitIds) => {
    return Unit.find({_id: {$in: unitIds}});
});

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
        return comments.map(comment => {
            return transformComment(comment);
        });
    } catch (err) {
        throw err;
    }
};

const reportedIssues = async reportedIssueIds => {
    try {
        const reportedIssues = await ReportedIssue.find({ _id: { $in: reportedIssueIds } });
        return reportedIssues.map(reportedIssue => {
            return transformReportedIssue(reportedIssue);
        })
    } catch (err) {
        throw err;
    }
}

const singleBuilding = async buildingId => {
    try {
        const building = await buildingLoader.load(buildingId.toString());
        return building;
    } catch (err) {
            throw err;
        }
};

const singlePost = async postId => {
    try {
        const post = await postLoader.load(postId.toString());
        return post;
    } catch (err) {
            throw err;
        }
};

const singleUnit = async unitId => {
    try {
        const unit = await unitLoader.load(unitId.toString());
        return unitId;
    } catch (err) {
            throw err;
        }
};

const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            createdPosts: () => postLoader.loadMany(user._doc.createdPosts)
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
};

const transformComment = comment => {
    return { 
        ...comment._doc, 
        createdAt: dateToString(comment._doc.createdAt),
        updatedAt: dateToString(comment._doc.updatedAt),
        user: user.bind(this, comment._doc.user),
        post: singlePost.bind(this, comment._doc.post)
     };
};

const transformReportedIssue = reportedIssue => {
    return { 
        ...reportedIssue._doc, 
        createdAt: dateToString(reportedIssue._doc.createdAt),
        updatedAt: dateToString(reportedIssue._doc.updatedAt),
        troubleshoot: singleTroubleshoot.bind(this, reportedIssue._doc.troubleshoot),
        unit: singleUnit.bind(this, reportedIssue._doc.unit),
        user: user.bind(this, reportedIssue._doc.user)
     };
};

const transformUnit = unit => {
    return { 
        ...unit._doc, 
        building: singleBuilding.bind(this, unit._doc.building._id),
        occupant: user.bind(this, unit._doc.occupant),
        reportedIssues: reportedIssues.bind(this, unit._doc.reportedIssues)
     };
};

exports.transformComment = transformComment;
exports.transformPost = transformPost;
exports.transformUnit = transformUnit;

//exports.user = user;
//exports.posts = posts;
//exports.singlePost = singlePost;