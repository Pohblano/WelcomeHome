const express = require("express");
const MenuModel = require('../Models/Menu')
const UserModel = require('../Models/Users')
// const {sendErrRes} = require('./UtilCtrls')

const MenuCtrls = {
    // Creates menu entry in MENU collections
    async createMenu(req, res, next) {
        const data = req.body
        const obj = {
            breakfast: {
                entree: data.breakfastEntree,
                info: data.breakfastInfo,
                time: data.breakfastTime,
                img: data.files[0],
                attending: []
            },
            lunch: {
                entree: data.lunchEntree,
                info: data.lunchInfo,
                time: data.lunchTime,
                img: data.files[1],
                attending: []
            },
            dinner: {
                entree: data.dinnerEntree,
                info: data.dinnerInfo,
                time: data.dinnerTime,
                img: data.files[2],
                attending: []
            },
            uploadedAt: new Date().toDateString()
        }
        await MenuModel.create(obj)
            .then(data => res.status(200))
            .catch(err => res.json(err))
    },
    // Gets the day's menu from MENU collections
    async getTodaysMenu(req, res, next) {
        const date = new Date().toDateString()
        await MenuModel.findOne({ uploadedAt: date })
            .then(menu => res.status(200).json(menu))
            .catch(err => res.json(err))
    },
    // Updates the days menu and meal attendance 
    async attendMenu(req, res, next) {
        const { menuID, meal } = req.params
        const { userID } = req.body;

        await MenuModel.findByIdAndUpdate(
            menuID,
            {
              $push: {
                [`${meal.toLowerCase()}.attending`]: userID,
              }
            },{new:true}
        ).then((menu) => res.status(200).json(menu))
        .catch(err => res.json(err))
          
    }
}

module.exports = MenuCtrls



