import { Path } from "leaflet"
import React from "react"
import { Link } from "react-router-dom"
import slugify from "slugify"
import { formatMoney } from "~/utilities/fn"
import pathname from "~/utilities/path"

const RelatedCard = ({ el }) => {
  return (
    <div className="p-4 flex gap-4" key={el.id}>
      <img
        src={el.images[0]}
        alt=""
        className="h-[70px] object-contain rounded-md"
      />
      <div className="flex flex-col gap-2">
        <Link
          to={`/${pathname.public.DETAIL_POST}/${el.id}/${slugify(el.title)}`}
          className="text-blue-600 font-semibold line-clamp-2"
        >
          {el.title}
        </Link>
        <span className="text-sm">{el.address}</span>
        {el.rRooms?.length > 0 && (
          <span>
            <span className="text-orange-600 text-lg">
              {el.rRooms?.length === 1
                ? `${formatMoney(el.rRooms[0]?.price)}`
                : `${formatMoney(
                    el.rRooms
                      .map((el) => el.price)
                      .reduce((a, b) => Math.min(a, b))
                  )} ~ ${formatMoney(
                    el.rRooms
                      .map((el) => el.price)
                      .reduce((a, b) => Math.max(a, b))
                  )}`}
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

export default RelatedCard
