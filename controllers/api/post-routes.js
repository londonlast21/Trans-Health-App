const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', (req, res) => {
    console.log('=============');
    Post.findAll({
        attributes: ['id', 'name', 'location', 'user_id'],
        include: [
            {
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

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name', 'location', 'user_id'],
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

router.post('/', (req, res) => {
    Post.create({
        name: req.body.name,
        location: req.body.location,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})



module.exports = router;