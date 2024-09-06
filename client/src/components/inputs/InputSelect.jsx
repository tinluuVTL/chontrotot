import clsx from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"

const InputSelect = ({
  register = () => {},
  id,
  errors,
  title,
  containerClassName,
  selectClassName,
  validate,
  options = [],
  isForm,
  defaultText = "Chọn",
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
      <select
        {...register(id, validate)}
        id={id}
        className={clsx(
          "rounded-md border border-gray-300 w-full",
          isForm && "form-select",
          selectClassName
        )}
      >
        <option value="">{defaultText}</option>
        {options.map((el, idx) => (
          <option value={el.value} key={idx}>
            {el.label}
          </option>
        ))}
      </select>
      {errors && errors[id] && (
        <small className="text-xs text-red-600">{errors[id].message}</small>
      )}
    </div>
  )
}

export default InputSelect
