const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const DATE_SHORT = require('luxon')

class BlogPost extends Model { };

BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        post_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: 0,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'blogpost'
    }
);

module.exports = BlogPost;