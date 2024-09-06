import moment from "moment"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AiFillEye } from "react-icons/ai"
import { useNavigate, useSearchParams } from "react-router-dom"
import Swal from "sweetalert2"
import { apiGetMyRooms } from "~/apis/user"
import { InputForm, InputSelect } from "~/components/inputs"
import { Pagiantion } from "~/components/paginations"
import { IndexCounterDetail } from "~/components/user"
import useDebounce from "~/hooks/useDebounce"
import { useAppStore, useUserStore } from "~/store"
import { formatMoney } from "~/utilities/fn"

const MyRoom = () => {
  const [searchParams] = useSearchParams()
  const {
    register,
    formState: { errors },
    watch,
  } = useForm()
  const sort = watch("sort")
  const keyword = watch("keyword")
  const { setModal, isShowModal } = useAppStore()
  const navigate = useNavigate()
  const [update, setUpdate] = useState(false)
  const [rooms, setRooms] = useState()
  const debounceKeyword = useDebounce(keyword, 800)
  useEffect(() => {
    const fetchRooms = async (params) => {
      const response = await apiGetMyRooms({
        limit: import.meta.env.VITE_LIMIT_POSTS,
        ...params,
      })
      if (response.success) {
        setRooms(response.posts)
      }
    }
    const params = Object.fromEntries([...searchParams])
    if (sort) params.sort = sort
    if (debounceKeyword) params.keyword = debounceKeyword
    fetchRooms(params)
  }, [searchParams, debounceKeyword, update, sort, isShowModal])

  return (
    <div className="w-full h-full">
      <div className="flex justify-between py-4 lg:border-b px-4 items-center">
        <h1 className="text-3xl font-bold">Phòng thuê của tôi</h1>
      </div>
      <div className="p-4">
        <p className="p-3 text-sm text-center italic rounded-md border border-blue-600 bg-blue-100 text-blue-600">
          NOTE: Xem trên PC hoặc Laptop để đầy đủ hơn
        </p>
      </div>
      <div className="p-4 w-full">
        <div className="my-4">
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
        <div className="my-4 w-full">
          <table className="max-w-full w-full overflow-x-auto">
            <thead>
              <tr>
                <th className="border p-3 text-center">ID</th>
                {/* <th className="border p-3 text-center">Ngày thanh toán</th>
                <th className="border p-3 text-center">Tiền thanh toán</th> */}
                <th className="border p-3 text-center">Tên phòng</th>
                <th className="border p-3 text-center">Giá điện</th>
                <th className="border p-3 text-center">Giá nước</th>
                <th className="border p-3 text-center">Giá cáp</th>
                <th className="border p-3 text-center">Giá internet</th>
                <th className="border p-3 text-center">Trạng thái thanh toán</th>
                <th className="border p-3 text-center">Trạng thái phòng</th>
                <th className="border p-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {rooms?.rows?.map((el) => (
                <tr key={el.id}>
                  <td className="border p-3 text-center">{el.id}</td>
                  {/* <td className="border p-3 text-center">{moment(el.createdAt).format("DD/MM/YYYY")}</td>
                  <td className="border p-3 text-center">{formatMoney(el.total)}</td> */}
                  <td className="border p-3 text-center">{el.rRoom?.title}</td>
                  <td className="border p-3 text-center">{formatMoney(el.rRoom?.electricPrice) + "đ/kWh"}</td>
                  <td className="border p-3 text-center">
                    {formatMoney(el.rRoom?.waterPrice) + "đ/"}
                    <span>
                      m<sup>3</sup>
                    </span>
                  </td>
                  <td className="border p-3 text-center">{formatMoney(el.rRoom?.capsPrice) + "đ/tháng"}</td>
                  <td className="border p-3 text-center">
                    {formatMoney(el.rRoom?.internetPrice) + "đ/tháng"}
                  </td>
                  <td className="border p-3 text-center">{el.status}</td>
                  <td className="border p-3 text-center">{el.rRoom?.position}</td>
                  <td>
                    <span className="flex items-center text-gray-500 gap-4 justify-center">
                      <span
                        onClick={() =>
                          setModal(true, <IndexCounterDetail roomId={el.rRoom?.id} roomPrices={el.rRoom} />)
                        }
                        title="Xem chỉ số"
                        className="cursor-pointer hover:text-blue-600"
                      >
                        <AiFillEye size={18} />
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-4">
          <Pagiantion totalCount={rooms?.count} limit={+import.meta.env.VITE_LIMIT_POSTS} />
        </div>
      </div>
    </div>
  )
}

export default MyRoom
