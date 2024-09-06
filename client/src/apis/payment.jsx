import axios from "../axios"

export const apiCreatePayment = (data) =>
  axios({
    url: "/payment/new",
    method: "post",
    data,
  })
