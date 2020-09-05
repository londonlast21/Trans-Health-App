const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


// router.get('/', (req, res) => {
//     res.render('homepage', {
//         id: 1,
//         name: 'Dr. Shiri Raphaely',
//         location: 'UW Health',
//         user_id: "Jack",
//         created_at: new Date(),
//         comments: [{}, {}],
//         user: {
//             username: 'test_user'
//         }
//     });
// });

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'name',
            'location',
            'user_id'
        ],
        include: [
            {
                model: Comment,
                attributes:['id', 'comment_text', 'post_id', 'user_id'],
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
        // pass a single post object into the homepage template
        console.log(dbPostData[0]);
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });




    
module.exports = router;