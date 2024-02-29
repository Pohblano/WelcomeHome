import api from "./Api"
import { defineCancelApiObject } from "./ApiUtils"

export const UserApi = {
    getId: async function (id, cancel = false) {
        const response = await api.request({
            url: `/profile/${id}`,
            method: "GET",
            // retrieving the signal value by using the property name
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
        })

        // returning the product returned by the API
        return response.data
    },
    getAllAvatars: async function (arr, cancel = false) {
        const response = await api.request({
            url: `/profile/all/avatars`,
            method: "POST",
            data: {users: arr},
            // retrieving the signal value by using the property name
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })

        // returning the product returned by the API
        return response.data
    },
    login: async function (credentials, cancel = false) {
        const response = await api.request({
            url: `/profile/login`,
            method: "POST",
            data: credentials,        
           // retrieving the signal value by using the property name
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
        })

        // returning the product returned by the API
        //HAVE RESPONSE SEND BACK TOKEN
        return response
    },
    getAll: async function (cancel = false) {
        const response = await api.request({
            url: "/profile/all",
            method: "GET",
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })

        return response
    },
    search: async function (name, cancel = false) {
        const response = await api.request({
            url: "/profile/search",
            method: "GET",
            params: {
                name: name,
            },
            signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
        })

        return response
    },
    create: async function (data, cancel = false) {
        const response = await api.request({
            url: `/profile`,
            method: "POST",
            data: data,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response
    },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(UserApi)