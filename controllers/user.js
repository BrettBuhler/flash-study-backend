const User = require('../models/userModel.js')
const passport = require('passport')
const bcrypt = require('bcrypt')

module.exports = {
    createUser: async (req, res) => {
        try {
            const { email, password } = req.body
            console.log(email, password)
            const salt = 10
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = new User({ email: email, password: hashedPassword })
            const existingUser = await User.findOne({ email })
            if (existingUser){
                return res.status(400).json({error: 'User already Exists'})
            }
            await newUser.save()
            req.logIn(newUser, (err) => {
              if (err) {
                return res.status(500).json({ error: 'Failed to log in' });
              }
              res.status(201).json({ message: `New user created under ${email}`, user: newUser });
            });
          } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    addDeck: async (req, res) => {
        try {
            const {_id, name, cards} = req.body
            const user = await User.findById(_id)
    
            const existingDeck = user.decks.find((deck) => deck.name === name)
            if (existingDeck){
                return res.status(400).json({message: 'A deck with the same name already exists'})
            }
    
            const newDeck = {
                name,
                cards
            }
    
            user.decks.push(newDeck)
    
            await user.save()
    
            return res.status(201).json({ message: 'Deck added successfully', user: user})
        } catch (error) {
            console.error('Error adding deck:', error)
            return res.status(500).json({ message: 'Internal server error (add deck)'})
        }
    },
    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
          if (err) {
            console.log('This is err', err)
            return next(err)
          }
      
          if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
          }
          req.logIn(user, (err) => {
            if (err) {
              return next(err)
            }
            return res.json({ message: 'Login successful', user: user})
          })
        })(req, res, next)
      },
      logout: (req, res, next) => {
        req.logout(function(err) {
            if (err) {return next(err)}
            res.setHeader('Cache-Control', 'no-store')
            res.redirect(303, '/')
        })
      },
      getAuthenticated: (req, res) => {
        if (req.user){
          const authenticatedUser = req.user
          return res.status(200).json({ message: 'User is authenticated', user: authenticatedUser})
        } else {
          return res.status(401).json({ message: 'Unauthorized' })
        }
      },
}