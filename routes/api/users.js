const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const login_validations = require('../../validation/login');
const register_validations = require('../../validation/register');


const DIR = './public/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});







router.get('/all', (req, res) => {
     User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ nogrowlsfound: 'No growls found' }));
}); 

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email
    });
})

router.post('/register', (req, res) => {


    const {errors, isValid} = register_validations(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email.toLowerCase()})
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
                birthday: req.body.birthday,
                profileImg: ''
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

    const { errors, isValid } = login_validations(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

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
                    email: user.email,
                    name: user.name,
                    birthday: user.birthday,
                    profileImg: user.profileImg
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

});

router.patch('/:user_id/upload', upload.single('profileImg'), (req,res) => {
    const file = req.file;
    const url = req.protocol + '://' + req.get('host');

    User.findByIdAndUpdate({_id: req.params.user_id}, {profileImg: url + '/public/'+ file.filename}, function(err, user){
        if(err){
            res.send(err)
        }else{
            res.send(user)
        }
    });

});


module.exports = router;