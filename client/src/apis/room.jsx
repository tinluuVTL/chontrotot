import axios from "../axios"

export const apiGetRooms = (params) =>
  axios({
    url: "/room/",
    method: "get",
    params,
  })
export const apiUpdateRoom = (id, data) =>
  axios({
    url: "/room/" + id,
    method: "patch",
    data,
  })
export const apiDeleteRoom = (id) =>
  axios({
    url: "/room/" + id,
    method: "delete",
  })
export const apiAddIndexCounter = (data) =>
  axios({
    url: "/room/index-counter/add",
    method: "post",
    data,
  })
export const apiCreateRoom = (data) =>
  axios({
    url: "/room/add",
    method: "post",
    data,
  })
export const apiUpdateRoomFull = (id, data) =>
  axios({
    url: "/room/full/" + id,
    method: "patch",
    data,
  })
