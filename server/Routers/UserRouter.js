const express = require("express");
const UserRouter = express.Router();
const UserCtrls = require('../Controllers/UserCtrls')

// Creates new user
UserRouter.post("/", UserCtrls.createUser)
// Logs and authenticates in user
UserRouter.post("/login", UserCtrls.authUser)
// Gets logged in user with decoded token _id
UserRouter.get('/:id', UserCtrls.getId)
// Gets basic user avatar list for an array of users 
UserRouter.post('/all/avatars', UserCtrls.getAllAvatars)



module.exports = UserRouter;