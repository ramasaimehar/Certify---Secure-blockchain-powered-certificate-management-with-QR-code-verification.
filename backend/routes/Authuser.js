const express = require('express');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserModel1 = require('../models/Userdata'); 
const storage = multer.memoryStorage();
const upload = multer({ storage });
const passport = require("passport");


router.use(express.json());
router.use(express.static('public'));
router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
router.use(cookieParser());

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

require("../config/passport");

// // Google login route
// router.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));

// // Google OAuth callback
// router.get('/auth/google/callback', passport.authenticate('google', {
//     failureRedirect: '/login',  // Redirect to login page on failure
//     session: true,
// }), (req, res) => {
//     const token = jwt.sign(
//         { email: req.user.email, username: req.user.username },
//         "jwt-secret-key",
//         { expiresIn: '1d' }
//     );
    
//     res.cookie('token', token);
//     res.redirect('http://localhost:5173');  // Redirect to frontend after success
// });


router.post("/user-register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await UserModel1.findOne({ email });
        if (existingUser) {
            return res.status(409).json("User already has an account");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel1({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json("Account created successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/user-details", async (req, res) => {
    try {
        console.log("user details")
        const users = await UserModel1.find({}, '-password'); 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel1.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign(
                            { email: user.email, username: user.username },
                            "jwt-secret-key",
                            { expiresIn: "1d" }
                        );
                        res.cookie('token', token);
                       res.status(200).json(user); // this is response.data
                    } else {
                        return res.json("password is incorrect");
                    }
                });
            } else {
                res.json("this email id is not registered");
            }
        })
        .catch(err => res.json(err));
});

router.get("/get_login", (req, res) => {
    UserModel1.find({})
        .then(function(users) {
            res.json(users);
        })
        .catch(function(err) {
            res.json(err);
        });
});


// Middleware to verify user before accessing protected routes
const verifyuser = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.json("The token is missing");
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json("The token is invalid"); // Token verification failed
            } else {
                req.email = decoded.email;
                req.username = decoded.username;
                next();
            }
        });
    }
};

// Protected route example
router.get('/profile', verifyuser, (req, res) => {
    res.json({ email: req.email, username: req.username });
});



router.get('/', verifyuser, (req, res) => {
    return res.json({ email: req.email, username: req.username });
});

module.exports = router;
