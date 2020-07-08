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