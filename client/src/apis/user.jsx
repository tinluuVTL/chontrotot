import axios from "../axios"

export const apiValidatePhoneNumber = (data) =>
  axios({
    url: "/user/validate-phonenumber",
    method: "post",
    data,
  })
export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
  })
export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  })
export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  })
export const apiUpdateProfile = (data) =>
  axios({
    url: "/user/profile",
    method: "patch",
    data,
  })
export const apiGetUsersByManager = (params) =>
  axios({
    url: "/user/manager",
    method: "get",
    params,
  })
export const apiUpgradeToManager = () =>
  axios({
    url: "/user/utm",
    method: "patch",
  })
export const apiGetUsersByAdmin = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  })
export const apiGetCustomers = (params) =>
  axios({
    url: "/user/customer",
    method: "get",
    params,
  })
export const apiUpdateUser = (id, data) =>
  axios({
    url: "/user/update/" + id,
    method: "patch",
    data,
  })
export const apiDeleteUser = (id) =>
  axios({
    url: "/user/" + id,
    method: "delete",
  })
export const apiUpdateUserByManager = (id, data) =>
  axios({
    url: "/user/update-by-manager/" + id,
    method: "patch",
    data,
  })
export const apiGetMyRooms = (params) =>
  axios({
    url: "/user/rented-rooms/",
    method: "get",
    params,
  })
export const apiGetIndexCounterByRoomId = (roomId) =>
  axios({
    url: "/user/rented-rooms-idx-counter/" + roomId,
    method: "get",
  })
export const apiUpdatePaymentIndex = (id, data) =>
  axios({
    url: "/user/payment-idx/" + id,
    method: "patch",
    data,
  })
