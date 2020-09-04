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
});

// edit dr name

router.put('/:id', (req, res) => {
    Post.update(
        {
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// edit location

router.put('/:id', (req, res) => {
    Post.update(
        {
            location: req.body.location
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' })
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;