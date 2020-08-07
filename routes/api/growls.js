const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Growl = require('../../models/Growl');
const validateGrowlInput = require('../../validation/growls');

router.get('/', (req, res) => {
    Growl.find()
        .sort({ date: -1 })
        .then(growls => res.json(growls))
        .catch(err => res.status(404).json({ nogrowlsfound: 'No growls found' }));
});

router.get('/user/:user_id', (req, res) => {
    Growl.find({ user: req.params.user_id })
        .then(growls => res.json(growls))
        .catch(err =>
            res.status(404).json({ nogrowlsfound: 'No growls found from that user' })
        );
});

router.get('/:id', (req, res) => {
    Growl.findById(req.params.id)
        .then(growl => res.json(growl))
        .catch(err =>
            res.status(404).json({ nogrowlfound: 'No growl found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateGrowlInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        console.log(req.user);

        const newGrowl = new Growl({
            text: req.body.text,
            user: req.user.id,
            handle: req.user.handle,
            profileImg: req.user.profileImg
        });


        newGrowl.save()
            .then(growl => res.json(growl));
    }
);
module.exports = router;