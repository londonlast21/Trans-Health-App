
  
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// get homepage
router.get('/', (req, res) => {
    console.log('=============');
    Post.findAll({
        attributes: ['id', 'name', 'location', 'specialty', 'user_id'],

       include: [
           {
               model: Comment,
               attributes: ['id', 'comment_text', 'post_id'],
               include: {
                   model: User,
                   attributes: ['username']
               }
           },{
               model: User,
               attributes: ['username']
           }
       ]

    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get acct page
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name', 'location', 'specialty'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No entry with this id found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

///make post

router.post('/', (req, res) => {
    console.log("hit post route");
    Post.create({
        name: req.body.name,
        location: req.body.location,
        specialty: req.body.specialty,
        user_id: req.session.user_id
        
        
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;