import clsx from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"
import { formatMoney } from "~/utilities/fn"

const ShowInformation = ({
  number = 0,
  unit = "",
  text = "",
  image,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx("col-span-1 w-full p-4 rounded-md flex text-white", className)
      )}
    >
      <div className="w-[30%] flex-auto flex items-center justify-center">
        <span className="text-2xl">{image}</span>
      </div>
      <div className="w-[70%] flex-auto flex flex-col justify-center items-center gap-2">
        <span className="text-3xl font-bold">
          {formatMoney(number)}
          <span>{unit}</span>
        </span>
        <span className="text-sm">{text}</span>
      </div>
    </div>
  )
}

export default ShowInformation
