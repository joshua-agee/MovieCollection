const express = require('express');
const router= express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//Index
router.get('/', (req,res)=>{
    User.find({}, (err, foundUsers)=>{
        if (err) {console.log(err)} else {
            res.render('users/index.ejs', {
                users: foundUsers,
                title: 'User List',
                currentUser: req.session.currentUser
            });
        }
    })
})
//New
router.get('/new', (req, res)=>{
    res.render('users/new.ejs',{
        title: 'New User',
        currentUser: req.session.currentUser
    });
})

//Show
router.get('/:id', (req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        if(err) {console.log(err)} else {
            res.render('users/show.ejs', {
                user: foundUser,
                title: foundUser.name,
                currentUser: req.session.currentUser
            })
        }
    })
})
//edit
router.get('/:id/edit', (req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        if(err) {console.log(err)} else {
            res.render('users/edit.ejs', {
                user: foundUser,
                title: foundUser.name,
                currentUser: req.session.currentUser
            })
        }
    })
})
//Update
router.put('/:id', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false}, (err, updatedUser)=>{
        if (err) {console.log(err)} else {
            res.redirect(`/users/${req.params.id}`);
        }
    })
})

//Create
router.post('/', (req, res)=>{
    req.body.passwordHash = bcrypt.hashSync(req.body.passwordHash, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        if (err) {console.log(err)} else {
            res.redirect('/users');
        }
    })
})
//Destroy
router.delete('/:id', (req,res)=>{
    User.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err)=>{
        if (err) {console.log(err)} else {
            res.redirect('/users');
        }});
    });

module.exports = router;