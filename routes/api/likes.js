const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Like = require('../../models/Like');

router.get('/all', (req, res) => {
    Like.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ nogrowlsfound: 'No likes found for this user' }));
});

router.get('/growl/:growl_id', (req, res) => {
    Like.find({ growl_id: req.params.growl_id })
        .then(likes => res.json(likes))
        .catch(err =>
            res.status(404).json({ nolikesfound: 'No likes found for this growl' })
        );
});

router.get('/user/:user_id', (req, res) => {
    Like.find({ user: req.params.user_id })
        .then(likes => res.json(likes))
        .catch(err =>
            res.status(404).json({ nolikesfound: 'No likes found for this user' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        
        const newLike = new Like({
            user: req.user.id,
            growl_id: req.body.growl_id
        });

        console.log(newLike);

        newLike.save()
            .then(like => res.json(like))
            .catch(err => console.log(err));

});

router.delete('/:id', (req,res) => {
    Like.findOneAndDelete({id: req.id})
    .then((like) => res.json(like))
    .catch((err) => res.json(err));
});

module.exports = router;