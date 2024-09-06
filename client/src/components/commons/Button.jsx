import clsx from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"
import { CgSpinner } from "react-icons/cg"
const Button = ({
  children,
  className,
  disabled,
  onClick,
  type = "button",
}) => {
  return (
    <button
      className={twMerge(
        clsx(
          "bg-blue-600 whitespace-nowrap text-white flex items-center justify-center py-2 px-4 gap-3 rounded-md",
          className,
          disabled && "bg-gray-500 opacity-50"
        )
      )}
      onClick={onClick}
      type={type}
    >
      {disabled && (
        <span className="animate-spin">
          <CgSpinner size={20} />
        </span>
      )}
      {children}
    </button>
  )
}

export default Button
