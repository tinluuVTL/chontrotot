import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pathname from "~/utilities/path";
import { CanHo, Checkout, DetailPost, DetailNew, Home, Login, PhongTro, PublicLayout, TimGhep, TinTuc, ChatComponent } from "./pages/public";
import { useAppStore, useUserStore } from "./store";
import { MyRoom, Profile, UserLayout, ViewContract } from "./pages/user";
import { Modal } from "./components/commons";
import Filter from "./pages/public/Filter";
import Lienhe from "./pages/public/LienHe";

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
} from "./pages/manager";
import { AdminDashboard, AdminLayout, ManagerDashboard } from "./pages/admin";
import ManageUser from "./pages/admin/ManageUser";
import clsx from "clsx";

const App = () => {
  const { getRoles, getCatalogs, isShowModal, contentModal, getCovenients } = useAppStore();
  const { getCurrent, token, current } = useUserStore(); // Ensure current user data is available

  useEffect(() => {
    getRoles();
    getCatalogs();
    getCovenients();
  }, []);

  useEffect(() => {
    if (token) getCurrent();
  }, [token]);

  // Check if the user has both ADMIN and MANAGER roles
  const hasAdminAndManagerRole = current?.rroles?.some((role) => role.roleCode === "ADMIN") &&
                                  current?.rroles?.some((role) => role.roleCode === "MANAGER");

  return (
    <main
      className={clsx(
        "bg-gray-100",
        isShowModal ? "w-screen h-screen overflow-hidden" : "w-full h-full overflow-auto"
      )}
    >
      {isShowModal && <Modal>{contentModal}</Modal>}

      <Routes>
        {/* Manager Routes */}
        <Route path={pathname.manager.LAYOUT} element={<ManagerLayout />}>
          {hasAdminAndManagerRole ? (
            <>
              <Route path={pathname.manager.DASHBOARD} element={<Dashboard />} />
              <Route path={pathname.manager.MANAGE_POST} element={<ManagePost />} />
              <Route path={pathname.manager.UPDATE_POST__POSTID} element={<UpdatePost />} />
              <Route path={pathname.manager.CREATE_POST} element={<CreatePost />} />
            </>
          ) : (
            <>
              <Route path={pathname.manager.DASHBOARD} element={<Dashboard />} />
              <Route path={pathname.manager.MANAGE_CONTRACT} element={<ManageContract />} />
              <Route path={pathname.manager.MANAGE_ROOM} element={<ManageRoom />} />
              <Route path={pathname.manager.CREATE_CONTRACT} element={<CreateContract />} />
              <Route path={pathname.manager.MANAGE_POST} element={<ManagePost />} />
              <Route path={pathname.manager.MANAGE_CUSTOMER} element={<ManagerCustomer />} />
              <Route path={pathname.manager.UPDATE_POST__POSTID} element={<UpdatePost />} />
              <Route path={pathname.manager.CREATE_POST} element={<CreatePost />} />
            </>
          )}
        </Route>

        {/* Public Routes */}
        <Route path={pathname.public.LAYOUT} element={<PublicLayout />}>
          <Route path={pathname.public.HOME} element={<Home />} />
          <Route path={pathname.public.CANHO} element={<CanHo />} />
          <Route path={pathname.public.PHONGTRO} element={<PhongTro />} />
          <Route path={pathname.public.CHECKOUT} element={<Checkout />} />
          <Route path={pathname.public.FILTER} element={<Filter />} />
          <Route path={pathname.public.LIENHE} element={<Lienhe />} />
          <Route path={pathname.public.TIMGHEP} element={<TimGhep />} />
          <Route path={pathname.public.TINTUC} element={<TinTuc />} />
          <Route path={pathname.public.DETAIL_NEW__PID} element={<DetailNew />} />
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
          <Route path={pathname.admin.MANAGE_DASHBOARD} element={<ManagerDashboard />} />
          <Route path={pathname.admin.MANAGE_USER} element={<ManageUser />} />
          <Route path={pathname.admin.MANAGE_POST} element={<ManagePost />} />
          <Route path={pathname.admin.UPDATE_POST__POSTID} element={<UpdatePost />} />
          <Route path={pathname.admin.CREATE_POST} element={<CreatePost />} />
        </Route>
      </Routes>

      {/* Chat Component */}
      <ChatComponent />

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
  );
};

export default App;