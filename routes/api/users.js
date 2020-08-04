const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: '../Growler/assets/uploads'}); 
const login_validations = require('../../validation/login');
const register_validations = require('../../validation/register');


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
                    birthday: user.birthday
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

// router.post('/:user_id/upload', upload.single('profile'), (req,res) => {
//     User.findById(req.params.user_id)
//     .then((user) => {
        
//         const file = req.file;
        

//         let s3bucket = new AWS.S3({
//             accessKeyId: keys.aws_access_key_id,
//             secretAccessKey: keys.aws_secret_access_key,
//             region: keys.aws_region,
//         });

//         let params = {
//             Bucket: keys.aws_bucket_name,
//             Key: file.originalname,
//             Body: file.buffer,
//             ContentType: file.mimetype,
//             ACL: "public-read"
//         };

//         s3bucket.upload(params, function (err, data) {
//             if (err) {
//                 res.status(500).json({ error: true, Message: err });
//             } else {
//                 res.send({ data });
//                 var newImageUploaded = {
//                     description: req.body.description,
//                     fileLink: s3FileURL + file.originalname,
//                     s3_key: params.Key
//                 };
//                 var document = new DOCUMENT(newImageUploaded);
//                 document.save(function (error, newFile) {
//                     if (error) {
//                         throw error;
//                     }
//                 });
//             }
//         });


//     });
// });


module.exports = router;