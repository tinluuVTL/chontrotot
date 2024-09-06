import axios from "../axios"

export const apiGetAllConvenients = () =>
  axios({
    url: "/convenient/all",
    method: "get",
  })
