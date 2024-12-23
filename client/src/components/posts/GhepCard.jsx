import React from "react"
import { formatMoney, renderStar } from "~/utilities/fn"
import { Link } from "react-router-dom"
import pathname from "~/utilities/path"
import slugify from "slugify"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"
import { CiPhone } from "react-icons/ci" // Make sure to import CiPhone
import moment from "moment"
const GhepCard = ({ images = [], title, star = 0, address, rRooms = [], rCatalog, bgCatalog, id, rUser }) => {
  return (
    <div className="p-4 bg-white col-span-1 relative border flex flex-col lg:grid lg:grid-cols-10 gap-4">
      <div
        className={twMerge(clsx("absolute p-2 right-2 top-2 bg-orange-600 text-white text-sm", bgCatalog))}
      >
        {rCatalog?.value}
      </div>
      <div className="col-span-2 w-full">
        <img
          src={images[0]}
          alt=""
          className="w-full lg:h-full max-h-[150px] rounded-t-md lg:rounded-md lg:object-cover"
        />
      </div>
      <div className="col-span-8 w-full flex flex-col gap-2">
        <Link
          to={`/${pathname.public.DETAIL_POST}/${id}/${slugify(title).toLocaleLowerCase()}`}
          className="font-semibold cursor-pointer hover:underline text-lg text-blue-600 line-clamp-3"
        >
          {title}
        </Link>
        <span className="flex items-center">
          {renderStar(+star)?.map((el, idx) => (
            <span className="text-lg" key={idx}>
              {el}
            </span>
          ))}
        </span>
        <div className="flex justify-between items-center">
          <span className="flex items-center">
            🚩 <span>{address}</span>
          </span>
          <span>
            Ngày đăng tin:{" "}
            <span>{moment(rUser?.updatedAt).format("DD/MM/YYYY")}</span>
          </span>
        </div>
        <span>
          📢 Đang tìm ghép
          {/* {" "}
          <span className="font-bold text-orange-500">
            {rRooms.filter((el) => el.position === "Còn trống").length}
          </span>{" "} */}
         
        </span>
        {rRooms?.length > 0 && (
          <span>
            <span className="text-orange-600 text-2xl">
              💵 {rRooms.length === 1
                ? `${formatMoney(rRooms[0]?.price)}`
                : `${formatMoney(
                    rRooms.map((el) => el.price).reduce((a, b) => Math.min(a, b))
                  )} ~ ${formatMoney(rRooms.map((el) => el.price).reduce((a, b) => Math.max(a, b)))}`}
            </span>{" "}
            VNĐ/ tháng/Người
          </span>
        )}
        {rRooms?.length > 0 && (
          <span>
            🏠{" "}
            <span className="text-orange-600 text-2xl">
              {rRooms.length === 1
                ? `${formatMoney(rRooms[0]?.area)}`
                : `${formatMoney(
                    rRooms.map((el) => el.area).reduce((a, b) => Math.min(a, b))
                  )} ~ ${formatMoney(rRooms.map((el) => el.area).reduce((a, b) => Math.max(a, b)))}`}
            </span>{" "}
            m2
          </span>
        )}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <img
              src={rUser?.rprofile?.image || "/user.svg"}
              alt=""
              className="w-8 h-8 object-cover rounded-full"
            />
            <span>{rUser?.username}</span>
          </span>
          <a
            onClick={() => {
              window.location.href = `tel:${rUser?.phone}`;
            }}
            className="flex my-4 gap-2 items-center font-bold justify-center py-2 rounded-md bg-green-600 text-white"
          >
           
            <CiPhone size={20} /> {rUser?.phone} 
            Gọi ngay
          </a>
        </div>
      </div>
    </div>
  )
}

export default GhepCard