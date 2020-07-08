const express = require('express');
const router= express.Router();
const User = require('../models/user');

//Index
router.get('/', (req,res)=>{
    User.find({}, (err, foundUsers)=>{
        if (err) {console.log(err)} else {
            res.render('users/index.ejs', {
                users: foundUsers
            });
        }
    })
})
//New
router.get('/new', (req, res)=>{
    res.render('users/new.ejs');
})

//Show
router.get('/:id', (req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        if(err) {console.log(err)} else {
            res.render('users/show.ejs', {
                user: foundUser
            })
        }
    })
})

//Create
router.post('/', (req, res)=>{
    console.log('post route hit');
    User.create(req.body, (err, createdUser)=>{
        if (err) {console.log(err)} else {
            res.redirect('/users');
        }
    })
})

module.exports = router;