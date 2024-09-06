import React, { useState } from "react"
import { HiMenuAlt2 } from "react-icons/hi"
import { Outlet } from "react-router-dom"
import { AdminSidebar } from "~/components/sidebars"
import { useUserStore } from "~/store"

const AdminLayout = () => {
  const { current } = useUserStore()
  const [isShowMenu, setIsShowMenu] = useState(false)
  if (!current || !current.rroles.some((el) => el.roleCode === "ADMIN"))
    return <Navigate to={`/${pathname.public.LOGIN}`} replace={true} />
  return (
    <section className="w-full min-h-screen lg:grid bg-white grid-cols-10 mx-auto">
      {isShowMenu && (
        <div
          onClick={() => setIsShowMenu(false)}
          className="absolute z-20 inset-0 bg-overlay-70 h-full"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-4/5 md:w-2/5 h-full bg-white"
          >
            <AdminSidebar setIsShowMenu={setIsShowMenu} />
          </div>
        </div>
      )}
      <div className="p-4 lg:hidden border-b flex justify-between items-center">
        <div
          onClick={() => setIsShowMenu(true)}
          className="cursor-pointer lg:hidden text-blue-600"
        >
          <HiMenuAlt2 size={30} />
        </div>
        <img
          src={current?.rprofile?.image || "/user.svg"}
          alt="user"
          className="rounded-full w-12 h-12 border border-blue-600 object-cover"
        />
      </div>
      <div className="col-span-2 hidden lg:block max-h-screen overflow-y-auto">
        <AdminSidebar />
      </div>
      <div className="col-span-8 lg:max-h-screen lg:overflow-y-auto">
        <Outlet />
      </div>
    </section>
  )
}

export default AdminLayout
