import moment from "moment"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import { Button } from "~/components/commons"
import { InputForm, InputSelect } from "~/components/inputs"
import { List } from "~/components/posts"
import { BoxFilter } from "~/components/searchs"
import { useAppStore, usePostStore } from "~/store"
import pathname from "~/utilities/path"

const Filter = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm()
  const sort = watch("sort")
  const navigate = useNavigate()
  const location = useLocation()
  const [seachParams] = useSearchParams()
  const { catalogs } = useAppStore()
  const { setIsResetFilter, isResetFilter } = usePostStore()
  useEffect(() => {
    if (isResetFilter) reset()
  }, [isResetFilter])
  useEffect(() => {
    const searchParamsObj = Object.fromEntries([...seachParams])
    if (sort) {
      searchParamsObj.sort = sort
    } else delete searchParamsObj.sort
    navigate({
      pathname: location.pathname,
      search: createSearchParams(searchParamsObj).toString(),
    })
  }, [sort])
  const handleResetFilter = () => {
    navigate({
      pathname: `/${pathname.public.FILTER}`,
      search: createSearchParams({}).toString(),
    })
    setIsResetFilter(true)
  }
  const handleFilterCatalog = (slug) => {
    const searchParamsObj = Object.fromEntries([...seachParams])
    navigate({
      pathname: `/${slug}`,
      search: createSearchParams(searchParamsObj).toString(),
    })
  }
  const handleFilter = (data) => {
    const searchParamsObj = Object.fromEntries([...seachParams])
    delete searchParamsObj["gia-tu"]
    delete searchParamsObj["gia-den"]
    delete searchParamsObj["dien-tich-tu"]
    delete searchParamsObj["dien-tich-den"]
    if (data.priceStart) searchParamsObj["gia-tu"] = data.priceStart * 1000
    if (data.priceEnd) searchParamsObj["gia-den"] = data.priceEnd * 1000
    if (data.areaStart) searchParamsObj["dien-tich-tu"] = data.areaStart
    if (data.areaEnd) searchParamsObj["dien-tich-den"] = data.areaEnd
    navigate({
      pathname: location.pathname,
      search: createSearchParams(searchParamsObj).toString(),
    })
  }
  return (
    <div className="w-full px-4 my-6 lg:w-main mx-auto grid grid-cols-1 gap-4">
      <h2 className="text-3xl font-semibold">
        Tìm kiếm{" "}
        <span>
          {seachParams.get("keyword") &&
            `từ khóa "${seachParams.get("keyword")}"`}
        </span>
      </h2>
      <div className="w-full grid grid-cols-10 gap-4">
        <div className="flex col-span-7 md:justify-between gap-4 items-center">
          <div className="flex items-center flex-wrap gap-4">
            <InputSelect
              defaultText="Sắp xếp"
              register={register}
              id="sort"
              errors={errors}
              options={[
                { label: "Mới nhất", value: "-createdAt" },
                { label: "Lâu nhất", value: "createdAt" },
                { label: "Từ A tới Z", value: "title" },
                { label: "Từ Z tới A", value: "-title" },
              ]}
              containerClassName="w-fit"
            />
            <Button className="bg-transparent w-fit text-black border-gray-300 border">
              Bộ lọc
            </Button>
            <Button
              onClick={handleResetFilter}
              className="bg-transparent w-fit text-orange-600 border-orange-300 border"
            >
              Reset bộ lọc
            </Button>
          </div>
          <span className="text-sm hidden md:block">
            Cập nhật <span>{moment().format("DD/MM/YYYY HH:mm:ss")}</span>
          </span>
        </div>
      </div>
      <div className="w-full grid grid-cols-10 gap-4">
        <div className="col-span-10 md:col-span-7">
          <List />
        </div>
        <form className="col-span-10 flex flex-col gap-4 md:col-span-3">
          <BoxFilter
            className="flex flex-col text-gray-600 gap-4"
            title="Thể loại"
          >
            {catalogs
              ?.filter((el) => el.slug !== "trang-chu")
              ?.map((el) => (
                <span
                  className="pb-3 border-b cursor-pointer hover:text-orange-600"
                  key={el.id}
                  onClick={() => handleFilterCatalog(el.slug)}
                >
                  👉🏼 {el.value}
                </span>
              ))}
          </BoxFilter>
          <BoxFilter className="flex flex-col gap-4" title="Giá thuê (x1000)">
            <InputForm
              register={register}
              id="priceStart"
              errors={errors}
              containerClassName="flex-row"
              placeholder="Giá bắt đầu (nghìn đồng/tháng)"
            />
            <InputForm
              register={register}
              id="priceEnd"
              errors={errors}
              containerClassName="flex-row"
              placeholder="Giá kết thúc (nghìn đồng/tháng)"
            />
            <Button
              onClick={handleSubmit(handleFilter)}
              className="bg-transparent border border-blue-600 text-blue-600"
            >
              Tìm kiếm
            </Button>
          </BoxFilter>
          <BoxFilter className="flex flex-col gap-4" title="Diện tích">
            <InputForm
              register={register}
              id="areaStart"
              errors={errors}
              containerClassName="flex-row"
              placeholder="Diện tích bắt đầu (m2)"
            />
            <InputForm
              register={register}
              id="areaEnd"
              errors={errors}
              containerClassName="flex-row"
              placeholder="Diện tích kết thúc (m2)"
            />
            <Button
              onClick={handleSubmit(handleFilter)}
              className="bg-transparent border border-blue-600 text-blue-600"
            >
              Tìm kiếm
            </Button>
          </BoxFilter>
        </form>
      </div>
    </div>
  )
}

export default Filter
