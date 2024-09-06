import clsx from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"

const InputForm = ({
  register = () => {},
  id,
  errors,
  placeholder,
  title,
  type = "text",
  inputClassName,
  isForm,
  containerClassName,
  validate,
  readOnly,
}) => {
  return (
    <div
      className={twMerge(
        clsx("w-full flex flex-col gap-2", containerClassName)
      )}
    >
      {title && (
        <label className="font-semibold" htmlFor={id}>
          {title + ":"}
        </label>
      )}
      <input
        type={type}
        readOnly={readOnly}
        className={twMerge(
          clsx(
            isForm && "form-input",
            "placeholder:text-gray-500 rounded-md border border-gray-300 w-full",
            readOnly &&
              "focus:outline-none focus:ring-0 focus:border-gray-300 bg-gray-100",
            inputClassName
          )
        )}
        placeholder={placeholder}
        {...register(id, validate)}
      />
      {errors && errors[id] && (
        <small className="text-xs text-red-600">{errors[id].message}</small>
      )}
    </div>
  )
}

export default InputForm
