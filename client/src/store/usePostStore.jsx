import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const usePostStore = create(
  persist(
    (set, get) => ({
      checkoutRoom: null,
      contractData: null,
      ownerData: null,
      isResetFilter: false,

      setCheckoutRoom: (data) => {
        return set(() => ({ checkoutRoom: data }))
      },
      setContractData: (data) => {
        return set(() => ({ contractData: data }))
      },
      setOwnerData: (data) => {
        return set(() => ({ ownerData: data }))
      },
      setIsResetFilter: (data) => {
        return set(() => ({ isResetFilter: data }))
      },
      resetContract: () => {
        return set(() => ({ ownerData: null, contractData: null }))
      },
    }),
    {
      name: "phongtro/post",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            (el) => el[0] === "checkoutRoom" || el[0] === "contractData" || el[0] === "ownerData"
          )
        ),
    }
  )
)
