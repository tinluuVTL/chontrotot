import moment from "moment"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useSearchParams } from "react-router-dom"
import { apiDeleteUser, apiGetUsersByAdmin } from "~/apis/user"
import { InputForm, InputSelect } from "~/components/inputs"
import { Pagiantion } from "~/components/paginations"
import useDebounce from "~/hooks/useDebounce"
import { useAppStore } from "~/store"
import { BiMessageSquareDetail } from "react-icons/bi"
import { DetailUser, UpdateUser } from "~/components/user"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const ManageUser = () => {
  const [searchParams] = useSearchParams()
  const {
    register,
    formState: { errors },
    watch,
  } = useForm()
  const sort = watch("sort")
  const keyword = watch("keyword")
  const { setModal, isShowModal } = useAppStore()
  const [update, setUpdate] = useState(false)
  const [users, setUsers] = useState()
  const fetchUsers = async (params) => {
    const response = await apiGetUsersByAdmin({
      limit: import.meta.env.VITE_LIMIT_POSTS,
      isDeleted: false,
      ...params,
    })
    if (response.success) {
      setUsers(response.users)
    }
  }
  const debounceKeyword = useDebounce(keyword, 800)
  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    if (sort) params.sort = sort
    if (debounceKeyword) params.keyword = debounceKeyword
    !isShowModal && fetchUsers(params)
  }, [isShowModal, searchParams, sort, debounceKeyword, update])
  const handleRemove = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Xác nhận",
      text: "Bạn chắc chắn muốn xóa thành viên ID: " + id + "?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteUser(id)
        if (response.success) {
          setUpdate((prev) => !prev)
          toast.success(response.mes)
        } else toast.error(response.mes)
      }
    })
  }
  return (
    <div className="w-full h-full">
      <div className="flex justify-between py-4 lg:border-b px-4 items-center">
        <h1 className="text-3xl font-bold">Quản lý thành viên</h1>
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
                placeholder="Username, SĐT, tên, ..."
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
          <table className="w-full overflow-x-auto">
            <thead>
              <tr>
                <th className="border p-3 text-center">ID</th>
                <th className="border p-3 text-center">Username</th>
                <th className="border p-3 text-center">Số điện thoại</th>
                <th className="border p-3 text-center">Vai trò</th>
                <th className="border p-3 text-center">Ngày đăng ký</th>
                <th className="border p-3 text-white bg-blue-600 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users?.rows?.map((el) => (
                <tr key={el.id}>
                  <td className="border p-3 text-center">{el.id}</td>
                  <td className="border p-3 text-center">{el.username}</td>
                  <td className="border p-3 text-center">{el.phone}</td>
                  <td className="border p-3 text-center">
                    {el?.rroles?.map((el) => el.roleValues?.value)?.join(" / ")}
                  </td>
                  <td className="border p-3 text-center">{moment(el.createdAt).format("DD/MM/YY")}</td>
                  <td className="border p-3 text-center">
                    <span className="flex items-center gap-4 justify-center">
                      <span
                        onClick={() => setModal(true, <DetailUser user={el} />)}
                        className="cursor-pointer hover:text-blue-600"
                        title="Xem chi tiết"
                      >
                        <BiMessageSquareDetail size={18} />
                      </span>
                      <span
                        onClick={() => setModal(true, <UpdateUser user={el} />)}
                        className="cursor-pointer hover:text-blue-600"
                        title="Chỉnh sửa"
                      >
                        <FiEdit size={18} />
                      </span>
                      <span
                        onClick={() => handleRemove(el.id)}
                        className="cursor-pointer hover:text-blue-600"
                        title="Xóa"
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
          <Pagiantion totalCount={users?.count} limit={+import.meta.env.VITE_LIMIT_POSTS} />
        </div>
      </div>
    </div>
  )
}

export default ManageUser
