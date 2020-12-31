const {Router} = require('express');
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const{check,validationResult} = require('express-validator');
module.exports = router
const jwt = require('jsonwebtoken')

// /api/router.auth/register
router.post('/register',
[
 check('email', 'Incorrect email!').isEmail(),
check('password', 'Minimal password length - 6 symbols').isLength({min:6})
],
    async (req, res) => {
    try {
        console.log('Body:',req.body)

        const errors = validationResult(req)


        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message:'<span style="font-size: large; color: red;">Incorrect registration data!</span>'})
        }

        const {email,password} = req.body
const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: '<span style="font-size: large; color: red;">This user has already been registered.</span>'})
        }
const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({email, password: hashedPassword})

        await user.save()
        return res.status(201).json({message:'<span style="font-size: large; color: lawngreen;">The user has been created!</span>'})
    }
    catch (e) {
        res.status(500).json({message:'<span style="font-size: large; color: red;">Something get wrong, please try again.</span>'})
    }
} )

// /api/router.auth/login
router.post('/login',
    [
      check('email', 'Enter a correct email').normalizeEmail().isEmail(),
        check('password', 'Enter a password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: '<span style="font-size: large; color: red;">Incorrect login data!</span>'})
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: '<span style="font-size: large; color: red;">There is no such user.</span>'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message:'<span style="font-size: large; color: red;">Incorrect password, try again.</span>'})
        }

        const token = jwt.sign(
            {userId: user.id},
         config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

await res.json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({message:'Something get wrong, please try again.'})
    }
} )

