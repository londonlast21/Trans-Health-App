const router = require('express').Router();
const { Comment } = require('../../models');


// get comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id']
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })


});

// make comment

router.post('/', (req, res) => {
    // check the session
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        post_id: 2,
        user_id: 1
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });



module.exports = router;