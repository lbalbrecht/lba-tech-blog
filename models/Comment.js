const { Model, DataTypes } = require('sequelize');
const sequelize = ('../config/connection');

class Comment extends Model { };

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment_body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        blogpost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'BlogPost',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'Comment'
    }
);

module.exports = Comment;