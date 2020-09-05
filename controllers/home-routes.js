const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
  Post.findAll({
      attributes: [
          'id',
          'name',
          'location',
          'created_at',
          'user.username'

      ],
      include: [
          {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                  model: User,
                  attributes: ['username']
              }
          }
      ]
  })
  .then(dbPostData => {
      res.render('homepage', dbPostData[0]);
  })


});

module.exports = router;