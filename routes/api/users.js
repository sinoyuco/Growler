const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');

router.get('/test', (req, res) => {
    res.json({ msg: "This is the users route"});
}); 

router.post('/register', (req, res) => {
<<<<<<< HEAD
    console.log(req)

    User.findOne({email: req.body.email})
=======
    User.findOne({email: req.body.email.toLowerCase()})
>>>>>>> f3f0bdfd1422cea452277f001ba66433e87215f9
    .then(user => {
        
        if (user) {
            return res.status(400).json({email: "A user already exists with this email"})
        } else {
            const newUser = new User({
                handle: req.body.handle,
                email: req.body.email.toLowerCase(),
                password: req.body.password,
                password2: req.body.password2,
                name: req.body.name,
                birthday: req.body.birthday
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));

                })
            })
        }
    })
})

router.post('/login', (req, res) => {

    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    User.findOne({ email })
    .then(user => {

        if (!user) {
            return res.status(404).json({email: 'This user does not exist'})
        } 
        bcrypt.compare(password, user.password)
        .then(isMatch => {
          
            if(isMatch) {
                const payload = {
                    id: user.id,
                    handle: user.handle,
                    email: user.email
                }

                jwt.sign(
                    payload, 
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({success: true,
                        token: 'Bearer ' + token})
                    }
                )
            } else {
                return res.status(400).json({ password: 'Incorrect password' })

            }
        })
    })

})


module.exports = router;