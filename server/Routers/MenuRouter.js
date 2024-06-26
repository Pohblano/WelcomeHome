const express = require("express");
const MenuRouter = express.Router();
const MenuCtrls = require('../Controllers/MenuCtrls')

// Creates daily menu
MenuRouter.post("/", MenuCtrls.createMenu)
// Gets daily menu
MenuRouter.get('/today', MenuCtrls.getTodaysMenu)
// Updates menu and who is attending
MenuRouter.post('/:menuID/attend/:meal', MenuCtrls.attendMenu)
// Updates menu to reflect chosen snacks and beverages
MenuRouter.post('/:menuID/update/:meal', MenuCtrls.updateSnacksAndBev)

module.exports = MenuRouter;