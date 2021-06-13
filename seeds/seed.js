const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userSeedData = require('./userSeedData.json');
const blogPostSeedData = require('./blogPostSeedData.json');
const commentSeedData = require('./commentSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData);
    const posts = await BlogPost.bulkCreate(blogPostSeedData);
    const comments = await Comment.bulkCreate(commentSeedData);

    await users[0].addBlogPost(1)
    await users[1].addBlogPost(2)
    await users[2].addBlogPost(3)

    await users[0].addComment(3)
    await users[0].addComment(5)
    await users[1].addComment(1)
    await users[1].addComment(6)
    await users[2].addComment(2)
    await users[2].addComment(4)

    await posts[0].addComment(1)
    await posts[0].addComment(2)
    await posts[1].addComment(3)
    await posts[1].addComment(4)
    await posts[2].addComment(5)
    await posts[2].addComment(6)
};

seedDatabase();