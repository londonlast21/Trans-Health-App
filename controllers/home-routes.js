const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


// test post
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

// route to get posts and load to homepage

router.get('/', (req, res) => {
    console.log(req.session);

    Post.findAll({
        attributes: [
            'id',
            'name',
            'location'
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
        
        console.log(dbPostData[0]);
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { 
            posts,
        loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });



// route to login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

// test for single post page
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'location',
            'specialty'
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post matching this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });
    

         res.render('single-post', { post,
        loggedIn: req.session.loggedIn });
    })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

    
module.exports = router;