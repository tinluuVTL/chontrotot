import React from "react";
import { formatMoney, renderStar } from "~/utilities/fn";
import { Link } from "react-router-dom";
import pathname from "~/utilities/path";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import moment from "moment"
const NewCard = ({
  images = [],
  title,
  star = 0,
  address,
  rRooms = [],
  rCatalog,
  bgCatalog,
  id,
  rUser,
}) => {
  return (
    <div className="p-4 bg-white col-span-1 relative border flex flex-col lg:grid lg:grid-cols-10 gap-4">
      <div
        className={twMerge(
          clsx("absolute p-2 right-2 top-2 text-white text-sm", {
            "bg-orange-600": rCatalog?.value !== "Tin Tức",
            "bg-red-600": rCatalog?.value === "Tin Tức",
          })
        )}
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
          to={`/${pathname.public.DETAIL_NEW}/${id}/${slugify(
            title
          ).toLocaleLowerCase()}`}
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
        <div className="flex justify-between items-center">
         
          <span>
            Ngày đăng tin:{" "}
            <span>{moment(rUser?.updatedAt).format("DD/MM/YYYY")}</span>
          </span>
        </div>
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
  );
};

export default NewCard;
