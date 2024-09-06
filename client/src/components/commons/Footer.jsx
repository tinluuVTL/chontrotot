import React from "react"
import { Link } from "react-router-dom"
import { useAppStore } from "~/store"

const Footer = () => {
  const { catalogs } = useAppStore()
  return (
    <div className="w-full bg-blue-600 text-white">
      <div className="w-full lg:w-main p-4 py-12 mx-auto flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-fit px-4 mb-6 flex items-center justify-center">
          <img src="/logow.png" alt="" className="h-[48px] object-contain" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 text-sm lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold">HỆ THỐNG</h2>
            <div className="flex flex-col gap-2">
              {catalogs?.map((el) => (
                <Link key={el.id} to={el.slug}>
                  {el.value}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold">VỀ CHÚNG TÔI</h2>
            <div className="flex flex-col gap-2">
              <span>
                Hotline: <span>0123456789</span>
              </span>
              <span>
                Email: <span>admin@admin.com</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
