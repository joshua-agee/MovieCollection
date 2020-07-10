const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router()
const User = require('../models/user');

sessions.get('/new', (req, res)=>{
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser,
        title: 'Login'
    })
})

sessions.post('/', (req, res)=>{
    User.findOne({username: req.body.username}, (err, foundUser)=>{
        if(err){console.log(err)}
        else if (!foundUser){
            res.send('<h3>Username or password incorrect</h3><br><a href="/" class="btn btn-primary">Home</a>');
        } else {
            if(bcrypt.compareSync(req.body.passwordHash, foundUser.passwordHash)){
                req.session.currentUser = foundUser
                res.redirect('/');
            } else {
                res.send('<h3>Username or password incorrect</h3><br><a href="/" class="btn btn-primary">Home</a>');
            }
        }
    })
})

sessions.delete('/', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
})

module.exports = sessions