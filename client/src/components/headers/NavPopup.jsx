import clsx from "clsx"
import React from "react"
import { Link, NavLink } from "react-router-dom"
import { useAppStore, useUserStore } from "~/store"
import { MdOutlineNavigateNext } from "react-icons/md"
import pathname from "~/utilities/path"
import { Button } from "../commons"
import { showOptions } from "~/utilities/constant"

const NavPopup = ({ setIsShowMenu }) => {
  const { catalogs } = useAppStore()
  const { current, logout } = useUserStore()
  return (
    <div
      onClick={() => setIsShowMenu(false)}
      className="flex flex-col justify-between gap-4 h-full"
    >
      <div className="py-4 flex flex-col">
        {catalogs?.map((el) => (
          <NavLink
            key={el.id}
            className={({ isActive }) =>
              clsx(
                "p-4 font-semibold border-b",
                isActive && "text-blue-600 bg-gray-100"
              )
            }
            to={`/${el.slug}`}
          >
            {el.value}
          </NavLink>
        ))}
      </div>
      <div className="px-4 flex flex-col gap-5">
        <Link
          to={`/${pathname.manager.LAYOUT}/${pathname.manager.CREATE_POST}`}
          className="bg-orange-600 py-3 px-4 flex items-center justify-center rounded-md text-white"
        >
          Đăng tin mới
        </Link>
        {showOptions.map(
          (el) =>
            current?.rroles?.some((n) => n.roleCode === el.code) && (
              <Link
                key={el.id}
                to={el.path}
                className="py-3 bg-transparent border-blue-600 border flex justify-center rounded-md text-blue-600"
              >
                {el.name}
              </Link>
            )
        )}
        {current && (
          <Button className="py-3" onClick={() => logout()}>
            Đăng xuất
          </Button>
        )}
      </div>
      <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
        {current ? (
          <Link to={`/${pathname.user.LAYOUT}/${pathname.user.PROFILE}`}>
            Xin chào, <span>{current.username}</span>
          </Link>
        ) : (
          <Link to={`/${pathname.public.LOGIN}`}>Đăng nhập</Link>
        )}
        <MdOutlineNavigateNext size={20} />
      </div>
    </div>
  )
}

export default NavPopup
