import clsx from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"
import List from "./List"

const HomeSection = ({ title, className, filters }) => {
  return (
    <div
      className={twMerge(clsx("w-full flex flex-col gap-4 mt-8", className))}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <List filters={filters} isHidePagination={true} />
    </div>
  )
}

export default HomeSection
