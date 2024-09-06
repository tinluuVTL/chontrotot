import moment from "moment"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RiDeleteBin6Line } from "react-icons/ri"
import { Link, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { apiGetContracts, apiRemoveContract } from "~/apis/contract"
import { InputForm, InputSelect } from "~/components/inputs"
import { Pagiantion } from "~/components/paginations"
import useDebounce from "~/hooks/useDebounce"
import { useUserStore } from "~/store"
import { formatMoney } from "~/utilities/fn"
import pathname from "~/utilities/path"

const ManageContract = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm()
  const sort = watch("sort")
  const keyword = watch("keyword")
  const { current } = useUserStore()
  const [contracts, setContracts] = useState()
  const [update, setUpdate] = useState(false)
  const [searchParams] = useSearchParams()
  const fetchContracts = async (params) => {
    const response = await apiGetContracts({
      limit: import.meta.env.VITE_LIMIT_CONTRACTS,
      postedBy: current?.id,
      ...params,
    })
    if (response.success) setContracts(response.contracts)
  }
  const debounceKeyword = useDebounce(keyword, 800)
  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    if (sort) params.sort = sort
    if (debounceKeyword) params.keyword = debounceKeyword
    fetchContracts(params)
  }, [update, debounceKeyword, searchParams])
  const handleDeleteContract = (id) => {
    Swal.fire({
      title: "Xác nhận",
      icon: "warning",
      text: "Bạn chắc chắn muốn xóa?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiRemoveContract(id)
        if (response.success) {
          toast.success(response.mes)
          setUpdate(!update)
        } else toast.error(response.mes)
      }
    })
  }
  return (
    <div className="w-full h-hull">
      <div className="py-4 lg:border-b flex items-center justify-between flex-wrap gap-4 px-4 w-full">
        <h1 className="text-3xl font-bold">Quản lý hợp đồng</h1>
        <div className="flex gap-4 items-center">
          <Link
            className="text-white bg-blue-600 px-4 py-2 rounded-md flex justify-center items-center"
            to={`/${pathname.manager.LAYOUT}/${pathname.manager.CREATE_CONTRACT}`}
          >
            Tạo mới
          </Link>
        </div>
      </div>
      <div className="p-4">
        <p className="p-3 text-sm text-center italic rounded-md border border-blue-600 bg-blue-100 text-blue-600">
          NOTE: Xem trên PC hoặc Laptop để đầy đủ hơn
        </p>
      </div>
      <div className="my-4 px-4">
        <div className="flex md:justify-between gap-4 items-center">
          <div className="flex items-center gap-4">
            <InputSelect
              defaultText="Sắp xếp"
              register={register}
              id="sort"
              errors={errors}
              options={[
                { label: "Mới nhất", value: "-createdAt" },
                { label: "Lâu nhất", value: "createdAt" },
                { label: "Chỉnh sửa gần nhất", value: "-updatedAt" },
                { label: "Từ A tới Z", value: "title" },
                { label: "Từ Z tới A", value: "-title" },
              ]}
              containerClassName="w-fit"
            />
            <InputForm
              id="keyword"
              register={register}
              errors={errors}
              placeholder="Tìm kiếm theo tựa đề, địa chỉ"
              containerClassName="w-fit"
              inputClassName="px-8 focus:px-4"
            />
          </div>
          <span className="text-sm hidden md:block">
            Cập nhật <span>{moment().format("DD/MM/YYYY HH:mm:ss")}</span>
          </span>
        </div>
      </div>
      <div className="p-4 w-full">
        <table className="max-w-full w-full overflow-x-auto">
          <thead>
            <tr>
              <th className="border p-3 text-center">ID</th>
              <th className="border p-3 text-center">Phòng</th>
              <th className="border p-3 text-center">Người thuê</th>
              <th className="border hidden md:table-cell p-3 text-center">Tiền đặt cọc</th>
              <th className="border p-3 text-center">Hết hạn</th>
              <th className="border hidden lg:table-cell p-3 text-center">Số người ở</th>
              <th className="border hidden lg:table-cell p-3 text-center">Ghi chú</th>
              <th className="border  p-3 text-white bg-blue-600 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {contracts?.rows?.map((el) => (
              <tr key={el.id}>
                <td className="border p-3 text-center">{el.id}</td>
                <td className="border p-3 text-center">
                  <span className="line-clamp-2">{el.rRoom?.title}</span>
                </td>
                <td className="border p-3 text-center">{el.rUser?.phone}</td>
                <td className="border hidden md:table-cell p-3 text-center">{formatMoney(el.preMoney)}</td>
                <td className="border p-3 text-center">{moment(el.expiredAt).format("DD/MM/YY")}</td>
                <td className="border p-3 hidden lg:table-cell text-center">{el.stayNumber}</td>
                <td className="border hidden lg:table-cell p-3 text-center">
                  <span className="line-clamp-2">{el.notes}</span>
                </td>
                <td className="border p-3 text-center">
                  <span className="flex items-center text-gray-500 gap-4 justify-center">
                    <span
                      title="Xóa"
                      className="cursor-pointer hover:text-blue-600"
                      onClick={() => handleDeleteContract(el.id)}
                    >
                      <RiDeleteBin6Line size={18} />
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4">
        <Pagiantion totalCount={contracts?.count} limit={+import.meta.env.VITE_LIMIT_CONTRACTS} />
      </div>
    </div>
  )
}

export default ManageContract
