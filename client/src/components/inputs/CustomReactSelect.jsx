import clsx from "clsx"
import React from "react"
import Select from "react-select"
import { twMerge } from "tailwind-merge"
const CustomReactSelect = ({
  placeholder,
  onChange,
  options = [],
  value = "",
  className,
  label,
  gap,
  register = () => {},
  id,
  validate,
  errors,
}) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-2 flex-1", gap))}>
      <h3 className="font-medium">{label}</h3>
      <Select
        {...register(id, validate)}
        placeholder={placeholder}
        isClearable
        options={options}
        value={options.find((el) => el.value === value)}
        isSearchable
        onChange={(val) => onChange(val)}
        formatOptionLabel={(option) => (
          <div className="flex text-black items-center gap-2">
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => clsx("border-2 py-[2px]", className),
          input: () => "text-sm",
          option: () => "text-sm",
        }}
      />
      {errors && errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  )
}

export default CustomReactSelect
