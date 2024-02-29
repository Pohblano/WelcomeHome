const express = require("express");
const MenuRouter = express.Router();
const MenuCtrls = require('../Controllers/MenuCtrls')

// Creates daily menu
MenuRouter.post("/", MenuCtrls.createMenu)
// Gets daily menu
MenuRouter.get('/today', MenuCtrls.getTodaysMenu)
// MenuRouter.get('/:id', MenuCtrls.getMenu)
// Updates menu and who is attending
MenuRouter.post('/:menuID/attend/:meal', MenuCtrls.attendMenu)

module.exports = MenuRouter;