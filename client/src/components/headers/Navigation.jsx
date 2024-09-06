import clsx from "clsx"
import React from "react"
import { NavLink } from "react-router-dom"
import { useAppStore } from "~/store"
import pathname from "~/utilities/path"

const Navigation = () => {
  const { catalogs } = useAppStore()
  return (
    <div className="hidden lg:flex items-center justify-center bg-blue-600">
      <div className="text-white w-main flex items-center">
        {catalogs?.map((el) => (
          <NavLink
            key={el.id}
            className={({ isActive }) =>
              clsx(
                "px-4 py-3 font-semibold hover:text-orange-300",
                isActive && "bg-orange-600"
              )
            }
            to={`/${el.slug}`}
          >
            {el.value}
          </NavLink>
        ))}
        <NavLink
          className={({ isActive }) =>
            clsx(
              "px-4 py-3 font-semibold hover:text-orange-300",
              isActive && "bg-orange-600"
            )
          }
          to={`/${pathname.public.FILTER}`}
        >
          Tìm kiếm
        </NavLink>
      </div>
    </div>
  )
}

export default Navigation
