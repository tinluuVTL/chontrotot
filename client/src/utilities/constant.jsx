import pathname from "./path"
import { FaRegUser } from "react-icons/fa"
import { BsReverseLayoutTextWindowReverse, BsPersonBoundingBox } from "react-icons/bs"
import { IoHomeOutline } from "react-icons/io5"
import { MdOutlineDashboard, MdOutlineBedroomParent, MdOutlineMeetingRoom, MdBarChart } from "react-icons/md"
import { LiaFileContractSolid } from "react-icons/lia"
import { HiMiniUserGroup } from "react-icons/hi2"
export const showOptions = [
  {
    id: 1,
    name: "Thông tin cá nhân",
    code: "USER",
    path: `/${pathname.user.LAYOUT}/${pathname.user.PROFILE}`,
  },
  {
    id: 2,
    name: "Chủ trọ",
    code: "MANAGER",
    path: `/${pathname.manager.LAYOUT}/${pathname.manager.DASHBOARD}`,
  },
  {
    id: 3,
    name: "Quản trị viên",
    code: "ADMIN",
    path: `/${pathname.admin.LAYOUT}/${pathname.admin.DASHBOARD}`,
  },
]
export const genders = [
  {
    id: 1,
    value: "Nam",
  },
  {
    id: 2,
    value: "Nữ",
  },
  {
    id: 3,
    value: "Khác",
  },
]
export const userSidebar = [
  {
    id: 1,
    name: "Thông tin cá nhân",
    path: `/${pathname.user.LAYOUT}/${pathname.user.PROFILE}`,
    icon: <FaRegUser size={20} />,
  },
  {
    id: 2,
    name: "Phòng thuê của tôi",
    path: `/${pathname.user.LAYOUT}/${pathname.user.MY_ROOM}`,
    icon: <MdOutlineMeetingRoom size={20} />,
  },
  {
    id: 999,
    name: "Homepage",
    path: `/`,
    icon: <IoHomeOutline size={20} />,
  },
]
export const getManagerSidebar = (currentUserRoles) => {
  const sidebarItems = [
    {
      id: 1,
      name: "Thống kê",
      path: `/${pathname.manager.LAYOUT}/${pathname.manager.DASHBOARD}`,
      icon: <MdOutlineDashboard size={20} />,
    },
    {
      id: 4,
      name: "Quản lý tin đăng",
      path: `/${pathname.manager.LAYOUT}/${pathname.manager.MANAGE_POST}`,
      icon: <BsReverseLayoutTextWindowReverse size={20} />,
    },
    {
      id: 2,
      name: "Quản lý phòng trọ",
      path: `/${pathname.manager.LAYOUT}/${pathname.manager.MANAGE_ROOM}`,
      icon: <MdOutlineBedroomParent size={20} />,
    },
    {
      id: 3,
      name: "Quản lý hợp đồng",
      path: `/${pathname.manager.LAYOUT}/${pathname.manager.MANAGE_CONTRACT}`,
      icon: <LiaFileContractSolid size={20} />,
    },
    {
      id: 6,
      name: "Quản lý người thuê",
      path: `/${pathname.manager.LAYOUT}/${pathname.manager.MANAGE_CUSTOMER}`,
      icon: <BsPersonBoundingBox size={20} />,
    },
    {
      id: 999,
      name: "Homepage",
      path: `/`,
      icon: <IoHomeOutline size={20} />,
    },
  ];

  // Check if the user has both ADMIN and MANAGER roles
  const hasAdminAndManagerRole = currentUserRoles?.some((role) => role.roleCode === "ADMIN") &&
                                  currentUserRoles?.some((role) => role.roleCode === "MANAGER");

  // If the user has both roles, return only the specified items
  if (hasAdminAndManagerRole) {
    return sidebarItems.filter(item => [1, 4, 999].includes(item.id));
  }

  return sidebarItems; // Return all items for other users
};

// Example usage
const currentUserRoles = [/* user roles data */];
const managerSidebarItems = getManagerSidebar(currentUserRoles);
export const adminSidebar = [
  {
    id: 1,
    name: "Thống kê",
    path: `/${pathname.admin.LAYOUT}/${pathname.admin.DASHBOARD}`,
    icon: <MdOutlineDashboard size={20} />,
  },
  {
    id: 2,
    name: "Thống kê chủ trọ",
    path: `/${pathname.admin.LAYOUT}/${pathname.admin.MANAGE_DASHBOARD}`,
    icon: <MdBarChart  size={20} />,
  },
  {
    id: 3,
    name: "Quản lý tin đăng",
    path: `/${pathname.admin.LAYOUT}/${pathname.admin.MANAGE_POST}`,
    icon: <BsReverseLayoutTextWindowReverse size={20} />,
  },
  // {
  //   id: 4,
  //   name: "Quản lý phòng trọ",
  //   path: `/${pathname.admin.LAYOUT}/${pathname.admin.MANAGE_ROOM}`,
  //   icon: <MdOutlineBedroomParent size={20} />,
  // },
  // {
  //   id: 5,
  //   name: "Quản lý hợp đồng",
  //   path: `/${pathname.admin.LAYOUT}/${pathname.admin.MANAGE_CONTRACT}`,
  //   icon: <LiaFileContractSolid size={20} />,
  // },
  // {
  //   id: 6,
  //   name: "Quản lý người thuê",
  //   path: `/${pathname.admin.LAYOUT}/${pathname.admin.MANAGE_CUSTOMER}`,
  //   icon: <BsPersonBoundingBox size={20} />,
  // },
  {
    id: 7,
    name: "Quản lý thành viên",
    path: `/${pathname.admin.LAYOUT}/${pathname.admin.MANAGE_USER}`,
    icon: <HiMiniUserGroup size={20} />,
  },
  {
    id: 999,
    name: "Homepage",
    path: `/`,
    icon: <IoHomeOutline size={20} />,
  },
]
export const priceOptions = [
  {
    id: 1,
    label: "Từ 0 - dưới 2 triệu",
    value: [0, 1999999],
  },
  {
    id: 2,
    label: "Từ 2 - dưới 5 triệu",
    value: [2000000, 4999999],
  },
  {
    id: 3,
    label: "Từ 5 - dưới 10 triệu",
    value: [5000000, 9999999],
  },
]
