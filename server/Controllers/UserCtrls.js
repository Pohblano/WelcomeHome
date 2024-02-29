const express = require("express");
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/Users')

// User controller functions that deal with PROFILES from mongoDB and send it to the front-end
const UserCtrls = {
    // Creates new user into profiles
    async createUser(req, res, next) {
        // const User = await UserModel.create(req.body);
        await UserModel.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => res.json(err))
    },
    // Authorizes user credentials for login
    async authUser(req, res, next) {
        const { email, password } = req.body;
        // Creates new user profile 
        const { err, user } = await UserModel.authenticate(email, password);
        
        if (user) {
            // Generate user token
            const token = user.generateAuthToken();
            console.log(typeof(token))
            res.status(200).json(token)
        }
        else res.json({ err })
    },
    // Grabs current user using _id from token in localstorage
    async getId(req, res, next){
        const id = req.params.id
        
        await UserModel.findById({_id: id}, 'name email _id createdAt')
            .then(user => res.status(200).json(user))
            .catch(err => res.json('No user found with that _id'))
    },
    // Grabs general user information used to display in avatars
    async getAllAvatars(req, res, next){
        const userList = req.body

        await UserModel.find({ "_id": { $in: userList.users } }, 'name img email createdAt')
            .then(data => res.status(200).json(data))
            .catch(err => res.json('No users attending yet.'))
    }
}

module.exports = UserCtrls