const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Itsmytime';
const User = require('../models/User');
var fetchuser = require('../middleware/fetchuser')
    //Create a user using POST:/api/auth/createuser
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should be of minimum 8 characters').isLength({ min: 8 }),
], async(req, res) => {
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: "Sorry, a user with this email already exists" });

        }

        let user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            return res.status(400).json({ success: false, error: "Sorry, a user with this email already exists" });

        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        success = true;
        res.json({ success: true, authtoken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error is there");
    }
});


//Authenticate a user by POST /api/auth/login

// Authenticate a user by POST /api/auth/login
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should be of minimum 8 characters').isLength({ min: 8 }),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: "Invalid email or password" });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ success: true, authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: "Some error occurred" });
    }
});

//User details get by GET /api/auth/getuser
router.post('/getuser', fetchuser, async(req, res) => {
    try {
        var userId = req.user.id;
        const user = await User.findById(userId).select("password")
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error is there");

    }
});
module.exports = router