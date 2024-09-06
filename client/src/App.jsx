import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import pathname from "~/utilities/path"
import { CanHo, Checkout, DetailPost, Home, Login, PhongTro, PublicLayout, TimGhep } from "./pages/public"
import { useAppStore, useUserStore } from "./store"
import { MyRoom, Profile, UserLayout, ViewContract } from "./pages/user"
import { Modal } from "./components/commons"
import Filter from "./pages/public/Filter"
import {
  CreateContract,
  Dashboard,
  ManageContract,
  ManageRoom,
  ManagerLayout,
  CreatePost,
  ManagePost,
  ManagerCustomer,
  UpdatePost,
} from "./pages/manager"
import { AdminDashboard, AdminLayout } from "./pages/admin"
import ManageUser from "./pages/admin/ManageUser"
import clsx from "clsx"

const App = () => {
  const { getRoles, getCatalogs, isShowModal, contentModal, getCovenients } = useAppStore()
  const { getCurrent, token } = useUserStore()
  useEffect(() => {
    getRoles()
    getCatalogs()
    getCovenients()
  }, [])
  useEffect(() => {
    if (token) getCurrent()
  }, [token])
  return (
    <main
      className={clsx(
        "bg-gray-100 ",
        isShowModal ? "w-screen h-screen overflow-hidden" : "w-full h-full overflow-auto"
      )}
    >
      {isShowModal && <Modal>{contentModal}</Modal>}

      <Routes>
        {/* Manager Routes */}
        <Route path={pathname.manager.LAYOUT} element={<ManagerLayout />}>
          <Route path={pathname.manager.DASHBOARD} element={<Dashboard />} />
          <Route path={pathname.manager.MANAGE_CONTRACT} element={<ManageContract />} />
          <Route path={pathname.manager.MANAGE_ROOM} element={<ManageRoom />} />
          <Route path={pathname.manager.CREATE_CONTRACT} element={<CreateContract />} />
          <Route path={pathname.manager.MANAGE_POST} element={<ManagePost />} />
          <Route path={pathname.manager.MANAGE_CUSTOMER} element={<ManagerCustomer />} />
          <Route path={pathname.manager.UPDATE_POST__POSTID} element={<UpdatePost />} />
          <Route path={pathname.manager.CREATE_POST} element={<CreatePost />} />
        </Route>

        {/* Public Routes */}
        <Route path={pathname.public.LAYOUT} element={<PublicLayout />}>
          <Route path={pathname.public.HOME} element={<Home />} />
          <Route path={pathname.public.CANHO} element={<CanHo />} />
          <Route path={pathname.public.PHONGTRO} element={<PhongTro />} />
          <Route path={pathname.public.CHECKOUT} element={<Checkout />} />
          <Route path={pathname.public.FILTER} element={<Filter />} />
          <Route path={pathname.public.TIMGHEP} element={<TimGhep />} />
          <Route path={pathname.public.DETAIL_POST__PID} element={<DetailPost />} />
          <Route path={pathname.public.TRANGCHU} element={<Home />} />
        </Route>

        {/* Common Route */}
        <Route path={pathname.public.LOGIN} element={<Login />} />
        <Route path={pathname.user.CONTRACT} element={<ViewContract />} />

        {/* User Routes */}
        <Route path={pathname.user.LAYOUT} element={<UserLayout />}>
          <Route path={pathname.user.PROFILE} element={<Profile />} />
          <Route path={pathname.user.MY_ROOM} element={<MyRoom />} />
        </Route>

        {/* Admin Routes */}
        <Route path={pathname.admin.LAYOUT} element={<AdminLayout />}>
          <Route path={pathname.admin.DASHBOARD} element={<AdminDashboard />} />
          <Route path={pathname.admin.MANAGE_USER} element={<ManageUser />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  )
}

export default App
