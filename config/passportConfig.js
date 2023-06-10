const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userModel.js')

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
        try {
            const user = await User.findOne({ email })
            if (!user){
                return done(null, false, { message: 'Invalid email or password' })
            }
            const isMatch = password === user.password
            if (!isMatch){
                return done(null, false, { message: 'Invalid email or password' })
            } else {
                return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

module.exports = (app) => {
    app.use(passport.initialize())
    app.use(passport.session())
}