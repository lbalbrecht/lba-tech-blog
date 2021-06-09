const { Model, DataTypes } = require('sequelize');
const sequelize = ('../config/connection');

class BlogPost extends Model { };

BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_date: {
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
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Comment',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'BlogPost'
    }
);

module.exports = BlogPost;