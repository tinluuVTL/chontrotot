import clsx from "clsx"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import withRouter from "~/hocs/withRouter"
const PagItem = ({ children, location, navigate }) => {
  const [seachParams] = useSearchParams()
  const handlePagination = () => {
    const params = Object.fromEntries([...seachParams])
    if (params.price) {
      params.price = seachParams.getAll("price")
    } else delete params.price
    if (params.area) {
      params.area = seachParams.getAll("area")
    } else delete params.area
    if (!Number(children)) return
    params.page = children
    navigate({
      pathname: location.pathname,
      search: createSearchParams(params).toString(),
    })
  }
  return (
    <button
      className={twMerge(
        clsx(
          "w-10 h-10 border flex items-center justify-center",
          !Number(children) && "flex justify-center pb-2",
          Number(children) &&
            "flex items-center bg-white justify-center rounded-md hover:bg-blue-500 hover:text-white",
          +seachParams.get("page") === +children &&
            "rounded-md bg-blue-600 text-white",
          !+seachParams.get("page") &&
            +children === 1 &&
            "rounded-md bg-blue-600 text-white"
        )
      )}
      onClick={handlePagination}
      type="button"
      disabled={!Number(children)}
    >
      {children}
    </button>
  )
}

export default withRouter(PagItem)
