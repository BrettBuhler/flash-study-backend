module.exports = {
    dashAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            next()
        }
    }
}