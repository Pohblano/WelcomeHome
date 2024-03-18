import api from "./Api"
import { defineCancelApiObject } from "./ApiUtils"

export const MenuApi = {
    create: async function (menuData, cancel = false) {
        const response = await api.request({
            url: `/menu/`,
            method: "POST",
            data: menuData,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response
    },
    getTodaysMenu: async function (cancel = false) {
        const response = await api.request({
            url: "/menu/today",
            method: "GET",
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },
    attend: async function (menuID, meal, userID, cancel = false){
        const response = await api.request({
            url: `/menu/${menuID}/attend/${meal}`,
            method: "POST",
            data: {userID: userID},
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },
    updateSnacksAndBev: async function (menuID, meal, data, cancel = false){
        const response = await api.request({
            url: `/menu/${menuID}/update/${meal}`,
            method: "POST",
            data: [data],
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    }
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(MenuApi)