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
export const apiGetAdminContracts = (params) =>
  axios({
    url: "/contract/admin/",
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
// Thêm API mới cho tính năng gửi email liên hệ
export const apiSendContactEmail = (data) =>
  axios({
    url: "/contract/contact-email",
    method: "post",
    data, // data bao gồm: name, email, phone, message
  })