import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const InputCheckbox = ({
  register = () => {},
  id,
  errors,
  title,
  containerClassName,
  optionsClassName,
  validate,
  options = [],
  values = [],
}) => {
  return (
    <div className={twMerge(clsx("w-full flex flex-col gap-2", containerClassName))}>
      {title && (
        <label className="font-semibold" htmlFor="">
          {title + ":"}
        </label>
      )}
      <div className={clsx(optionsClassName)}>
        {options.map((el, idx) => (
          <div className="flex my-2 items-center gap-2" key={idx}>
            <input
              type="checkbox"
              name={id}
              {...register(id, validate)}
              id={el.value}
              value={el.value}
              checked={values?.some((n) => String(n) === String(el.value))}
            />
            <label htmlFor={el.value}>{el.label}</label>
          </div>
        ))}
      </div>
      {errors && errors[id] && <small className="text-xs text-red-600">{errors[id].message}</small>}
    </div>
  )
}

export default InputCheckbox
