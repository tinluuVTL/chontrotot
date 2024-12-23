import React from "react";
import { UserInformation } from "../user";
import { getManagerSidebar } from "~/utilities/constant"; // Make sure to import the function
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useUserStore } from "~/store"; // Import your user store

const ManagerSidebar = ({ setIsShowMenu }) => {
  // Get current user roles from the store
  const { current } = useUserStore(); // Adjust according to your store structure
  const sidebarItems = getManagerSidebar(current?.rroles); // Get sidebar items based on roles

  return (
    <div className="flex flex-col bg-blue-700 text-white h-full justify-between">
      <div className="flex flex-col">
        <UserInformation />
        <div
          onClick={() => setIsShowMenu && setIsShowMenu(false)}
          className="mt-6"
        >
          {sidebarItems.map((el) => (
            <NavLink
              className={({ isActive }) =>
                twMerge(
                  clsx(
                    "px-4 py-4 flex items-center gap-2 hover:text-orange-500",
                    isActive && "bg-blue-900 border-r-4 border-orange-600"
                  )
                )
              }
              to={el.path}
              key={el.id}
            >
              {el.icon}
              <span>{el.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerSidebar;