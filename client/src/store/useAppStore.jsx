import { create } from "zustand"
import { apiGetCatalogs, apiGetRoles } from "~/apis/app"
import { apiGetAllConvenients } from "~/apis/convenient"

const bgPools = [
  "bg-orange-600",
  "bg-green-600",
  "bg-blue-600",
  "bg-yellow-600",
  "bg-sand-600",
  "bg-sky-600",
  "bg-purple-600",
]

export const useAppStore = create((set) => ({
  // Properties
  isShowModal: false,
  contentModal: null,
  catalogs: [],
  roles: [],
  convenientsData: [],
  isResetImg: false,

  // Methods
  setModal: (isShowModal, contentModal) => set(() => ({ isShowModal, contentModal })),

  getRoles: async () => {
    const response = await apiGetRoles()
    if (response.success) set(() => ({ roles: response.roles }))
    else set(() => ({ roles: [] }))
  },
  getCatalogs: async () => {
    const response = await apiGetCatalogs()
    if (response.success)
      set(() => ({
        catalogs: response.catalogs?.map((el, idx) => ({
          ...el,
          bg: bgPools[idx],
        })),
      }))
    else set(() => ({ catalogs: [] }))
  },
  getCovenients: async () => {
    const response = await apiGetAllConvenients()
    if (response.success) set(() => ({ convenientsData: response.convenients }))
    else set(() => ({ convenientsData: [] }))
  },
}))
