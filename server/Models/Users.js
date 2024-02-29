// Require Mongoose
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter your name.'],
  },
  email: {
    type: String,
    required: [true, 'Enter an email address'],
    unique: [true, 'That email is already in use.'],
    validate: [validator.isEmail, 'Enter a valid email address.'],
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: [true, 'Enter a password'],
    minLenth: [8, 'Password should be atleast four characters']
  },
  img: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(this.password, 10); // Adjust salt rounds as needed
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Method to generate JWT token
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, 'MayTheForceBeWithYou'); // You should replace process.env.JWT_SECRET with your own secret key
  return token;
};

// Static method to authenticate user
UserSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email });
  if(user){
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return {err: "Password is incorrect."}
    else return {user: user}
  }else return {err: "No user found with that email."}

};


const UserModel = mongoose.model("profiles", UserSchema)
module.exports = UserModel;