import axios from "../axios"

export const apiCreateContract = (data) =>
  axios({
    url: "/contract/new",
    method: "post",
    data,
  })
export const apiGetContracts = (params) =>
  axios({
    url: "/contract/",
    method: "get",
    params,
  })
export const apiUpdateContract = (id, data) =>
  axios({
    url: "/contract/" + id,
    method: "patch",
    data,
  })
export const apiRemoveContract = (id) =>
  axios({
    url: "/contract/" + id,
    method: "delete",
  })
export const apiGetCustomer = (params) =>
  axios({
    url: "/contract/customer",
    method: "get",
    params,
  })
