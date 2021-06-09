const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userSeedData = require('./userSeedData');
const blogPostSeedData = require('./blogPostSeedData');
const commentSeedData = require('./commentSeedData');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData);
    const posts = await BlogPost.bulkCreate(blogPostSeedData);
    const comments = await Comment.bulkCreate(commentSeedData);
};

seedDatabase();