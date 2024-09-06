import React from "react"
import { formatMoney, renderStar } from "~/utilities/fn"
import { Link } from "react-router-dom"
import pathname from "~/utilities/path"
import slugify from "slugify"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"

const PostCard = ({ images = [], title, star = 0, address, rRooms = [], rCatalog, bgCatalog, id, rUser }) => {
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
        <span className=" flex items-center">
          {renderStar(+star)?.map((el, idx) => (
            <span className="text-lg" key={idx}>
              {el}
            </span>
          ))}
        </span>
        <span>
          🚩 <span>{address}</span>
        </span>
        <span>
          📢 Còn{" "}
          <span className="font-bold text-orange-500">
            {rRooms.filter((el) => el.position === "Còn trống").length}
          </span>{" "}
          phòng trống
        </span>
        {rRooms?.length > 0 && (
          <span>
            <span className="text-orange-600 text-2xl">
              {rRooms.length === 1
                ? `${formatMoney(rRooms[0]?.price)}`
                : `${formatMoney(
                    rRooms.map((el) => el.price).reduce((a, b) => Math.min(a, b))
                  )} ~ ${formatMoney(rRooms.map((el) => el.price).reduce((a, b) => Math.max(a, b)))}`}
            </span>{" "}
            VNĐ
          </span>
        )}
        <span className="flex items-center gap-2">
          <img
            src={rUser?.rprofile?.image || "/user.svg"}
            alt=""
            className="w-8 h-8 object-cover rounded-full"
          />
          <span>{rUser?.username}</span>
        </span>
      </div>
    </div>
  )
}

export default PostCard
