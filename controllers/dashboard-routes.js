const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');




router.get('/',  (req, res) => {
    console.log("session ", req.session);
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'location',
        'name'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
      
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
       
          user_id: req.session.user_id
        },
        attributes: [
          'id',
         'location',
         'name'
       
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
          
          const post = dbPostData.get({ plain: true });
          res.render('edit-post', { 
              post,
            loggedIn: true
         });
        })
       

});
module.exports = router;