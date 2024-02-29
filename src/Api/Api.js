import axios from "axios"

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/api",
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Credentials': 'true',
    'accept': 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
   },
})

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error)
  }

  return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
});

export default api;