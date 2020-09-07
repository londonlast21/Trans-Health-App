const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
    console.log("made it to route");
    res.render('dashboard', { loggedIn: true });
});


module.exports = router;