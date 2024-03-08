const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    breakfast:{
        type: Object,
    },
    lunch:{
        type: Object,
    },
    dinner:{
        type: Object,
    },
    snacksAndBev:{
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    uploadedAt: {
        type: String
    }
})

const MenuModel = mongoose.model("menus", MenuSchema)
module.exports = MenuModel;