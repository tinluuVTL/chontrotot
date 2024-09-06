import React, { Fragment, useEffect, useState } from "react"
import { Link, createSearchParams, useNavigate } from "react-router-dom"
import { HiMenuAlt3 } from "react-icons/hi"
import { NavPopup } from "."
import { Button } from "../commons"
import pathname from "~/utilities/path"
import { usePostStore, useUserStore } from "~/store"
import { showOptions } from "~/utilities/constant"
import useDebounce from "~/hooks/useDebounce"
const LogoContainer = () => {
  const navigate = useNavigate()
  const { isResetFilter, setIsResetFilter } = usePostStore()
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [isShowOptions, setIsShowOptions] = useState(false)
  const { current, logout } = useUserStore()
  const [keyword, setKeyword] = useState("")
  const debounceKeyword = useDebounce(keyword, 800)
  useEffect(() => {
    if (debounceKeyword) {
      navigate({
        pathname: `/${pathname.public.FILTER}`,
        search: createSearchParams({ keyword: debounceKeyword }).toString(),
      })
    }
  }, [debounceKeyword])
  useEffect(() => {
    if (isResetFilter) {
      setKeyword("")
      setIsResetFilter(false)
    }
  }, [isResetFilter])
  return (
    <div className="w-full max-w-main px-4 py-8 mx-auto gap-4 flex items-center justify-between">
      {isShowMenu && (
        <div
          onClick={() => setIsShowMenu(false)}
          className="absolute inset-0 z-50 bg-overlay-70 flex justify-end"
        >
          <div onClick={(e) => e.stopPropagation()} className="bg-white w-4/5 animate-slide-right">
            <NavPopup setIsShowMenu={setIsShowMenu} />
          </div>
        </div>
      )}
      <Link className="flex-none w-[35%] md:w-[200px]" to="/">
        <img src="/logo.png" alt="logo" className="w-full object-contain" />
      </Link>
      <div className="flex-auto max-w-[500px]">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm phòng trọ..."
          className="px-4 py-2 border-blue-600 placeholder:text-sm placeholder:text-gray-400 border w-full rounded-l-full rounded-r-full"
        />
      </div>
      <div onClick={() => setIsShowMenu(true)} className="cursor-pointer md:hidden text-blue-600">
        <HiMenuAlt3 size={30} />
      </div>
      <div className="hidden justify-center items-center gap-3 md:flex">
        {!current && (
          <Button
            onClick={() => navigate(`/${pathname.public.LOGIN}`)}
            className="bg-transparent border border-blue-600 text-blue-600"
          >
            Đăng nhập / Đăng ký
          </Button>
        )}
        {current && (
          <div
            onClick={() => setIsShowOptions((prev) => !prev)}
            className="flex items-center gap-2 mx-4 cursor-pointer relative"
          >
            {isShowOptions && current && (
              <div className="absolute flex flex-col right-0 top-full py-2 bg-white rounded-md border drop-shadow-sm">
                {showOptions.map((el) => (
                  <Fragment key={el.id}>
                    {current.rroles?.some((item) => item.roleCode === el.code) && (
                      <Link className="px-4 py-2 hover:bg-gray-100" to={el.path}>
                        {el.name}
                      </Link>
                    )}
                  </Fragment>
                ))}
                <span className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => logout()}>
                  Đăng xuất
                </span>
              </div>
            )}
            <img
              src={current?.rprofile?.image || "/user.svg"}
              alt="user-avatar"
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="flex flex-col">
              <span>
                Xin chào, <span>{current.username}</span>
              </span>
              <span>
                ID: <span>#{current?.id}</span>
              </span>
            </div>
          </div>
        )}
        {current?.rroles?.some((el) => el.roleCode === "MANAGER") && (
          <Link
            to={`/${pathname.manager.LAYOUT}/${pathname.manager.CREATE_POST}`}
            className="bg-orange-600 px-4 py-3 rounded-md flex items-center justify-center text-white"
          >
            Đăng tin mới
          </Link>
        )}
      </div>
    </div>
  )
}

export default LogoContainer
