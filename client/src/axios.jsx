import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    let token = window.localStorage.getItem("phongtro")
    if (token) token = JSON.parse(token)
    if (token.state?.token)
      config.headers = {
        Authorization: `Bearer ${token.state?.token}`,
      }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data
  }
)

export default instance
