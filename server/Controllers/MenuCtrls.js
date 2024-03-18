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
                attending: [],
                snacksAndBev: data.breakfastSnacksAndBev
            },
            lunch: {
                entree: data.lunchEntree,
                info: data.lunchInfo,
                time: data.lunchTime,
                img: data.files[1],
                attending: [],
                snacksAndBev: data.lunchSnacksAndBev
            },
            dinner: {
                entree: data.dinnerEntree,
                info: data.dinnerInfo,
                time: data.dinnerTime,
                img: data.files[2],
                attending: [],
                snacksAndBev: data.dinnerSnacksAndBev
            },
            uploadedAt: new Date().toDateString()
        }
        await MenuModel.create(obj)
            .then(data => {
                res.status(200)
            })
            .catch(err => res.json(`${err.message}:`))
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
          
    },
    // Updates snacks and beverage count on menu
    async updateSnacksAndBev(req, res, next){
        const { menuID, meal } = req.params
        const snacksAndBev = req.body['0']
        
        // const arr = []
        // snacksAndBev.map(x => {
        //     if(x.count != 0) arr.push(x.name)
        // })

        const arr = snacksAndBev.filter((obj) => obj.count > 0)
        console.log(arr)
        console.log(menuID, meal)
        console.log(snacksAndBev)

        await MenuModel.findByIdAndUpdate(
            menuID,
            {
              $set: {
                [`${meal.toLowerCase()}.snacksAndBev`]: snacksAndBev,
              }
            },{new:true}
        ).then(() => res.status(200))
        .catch(err => res.json(err))
    }
}

module.exports = MenuCtrls



