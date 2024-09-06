import clsx from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"
import { InputForm } from "../inputs"
import { useForm } from "react-hook-form"

const BoxFilter = ({ title, children, className }) => {
  return (
    <div className="border rounded-md flex flex-col">
      <div className="text-center bg-blue-600 text-white rounded-t-md p-4 font-semibold">
        {title}
      </div>
      <div className={twMerge(clsx("p-4", className))}>{children}</div>
    </div>
  )
}

export default BoxFilter
