const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        name: 'Dr. Shiri Raphaely',
        location: 'UW Health',
        user_id: "Jack",
        created_at: new Date(),
        comments: [{}, {}],
        user: {
            username: 'test_user'
        }
    });
});

module.exports = router;