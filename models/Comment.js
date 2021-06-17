const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { };

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment_body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        comment_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: 0,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        blogpost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blogpost',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'comment'
    }
);

module.exports = Comment;