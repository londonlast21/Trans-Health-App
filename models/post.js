const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING,
            references: {
                model: 'User',
                key: 'username'
            }
        },
        specialty: {
            type: DataTypes.STRING,
           allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;
