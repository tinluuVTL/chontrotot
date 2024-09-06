import moment from "moment"
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { apiGetPosts, apiRemovePost } from "~/apis/post"
import { Pagiantion } from "~/components/paginations"
import { useAppStore, useUserStore } from "~/store"
import pathname from "~/utilities/path"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit } from "react-icons/fi"
import slugify from "slugify"
import { InputForm, InputSelect } from "~/components/inputs"
import { useForm } from "react-hook-form"
import useDebounce from "~/hooks/useDebounce"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const ManagePost = () => {
  const { current } = useUserStore()
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
  const [posts, setPosts] = useState()
  const fetchPosts = async (params) => {
    const response = await apiGetPosts({
      limit: import.meta.env.VITE_LIMIT_POSTS,
      postedBy: current?.id,
      ...params,
    })
    if (response.success) {
      setPosts(response.posts)
    }
  }
  const debounceKeyword = useDebounce(keyword, 800)
  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    if (sort) params.sort = sort
    if (debounceKeyword) params.keyword = debounceKeyword
    !isShowModal && fetchPosts(params)
  }, [isShowModal, searchParams, sort, debounceKeyword, update])
  const handleRemove = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Xác nhận",
      text: "Bạn chắc chắn muốn xóa?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiRemovePost(id)
        if (response.success) {
          toast.success(response.mes)
          setUpdate(!update)
        } else toast.error(response.mes)
      }
    })
  }
  return (
    <div className="w-full h-full">
      <div className="flex justify-between py-4 lg:border-b px-4 items-center">
        <h1 className="text-3xl font-bold">Quản lý tin đăng</h1>
        <Link
          to={`/${pathname.manager.LAYOUT}/${pathname.manager.CREATE_POST}`}
          className="py-2 px-4 bg-blue-600 text-white flex justify-center items-center rounded-md"
        >
          Tạo mới
        </Link>
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
                <th className="border p-3 text-center">Tựa đề</th>
                <th className="border p-3 text-center">Tổng số phòng</th>
                <th className="border p-3 text-center">Thể loại</th>
                <th className="border p-3 text-center">Đánh giá</th>
                <th className="border p-3 text-center">Ngày chỉnh sửa</th>
                <th className="border p-3 text-white bg-blue-600 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {posts?.rows?.map((el) => (
                <tr key={el.id}>
                  <td className="border p-3 text-center">{el.id}</td>
                  <td className="border p-3 text-center cursor-pointer hover:underline text-blue-600">
                    <Link to={`/${pathname.public.DETAIL_POST}/${el.id}/${slugify(el.title)}`}>
                      {el.title}
                    </Link>
                  </td>
                  <td className="border p-3 text-center">{el.rRooms?.filter((i) => !i.isDeleted)?.length}</td>
                  <td className="border p-3 text-center">{el.rCatalog?.value}</td>
                  <td className="border p-3 text-center">{el.star}</td>
                  <td className="border p-3 text-center">{moment(el.updatedAt).format("DD/MM/YY")}</td>
                  <td className="border p-3 text-center">
                    <span className="flex items-center gap-4 justify-center">
                      <span
                        onClick={() =>
                          navigate(`/${pathname.manager.LAYOUT}/${pathname.manager.UPDATE_POST}/${el.id}`)
                        }
                        className="cursor-pointer hover:text-blue-600"
                      >
                        <FiEdit size={18} />
                      </span>
                      <span
                        onClick={() => handleRemove(el.id)}
                        className="cursor-pointer hover:text-blue-600"
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
          <Pagiantion totalCount={posts?.count} limit={+import.meta.env.VITE_LIMIT_POSTS} />
        </div>
      </div>
    </div>
  )
}

export default ManagePost
