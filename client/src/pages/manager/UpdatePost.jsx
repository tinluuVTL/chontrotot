import React, { useEffect, useState } from "react"
import { RiCloseCircleFill, RiDeleteBin6Line, RiFileEditLine } from "react-icons/ri"
import { EditRoom } from "~/components/user"
import { InputFile, InputForm, InputSelect, InputText } from "~/components/inputs"
import { useForm } from "react-hook-form"
import { useAppStore } from "~/store"
import { toast } from "react-toastify"
import { Button } from "~/components/commons"
import { apiGetPostById, apiUpdatePost } from "~/apis/post"
import { Link, useNavigate, useParams } from "react-router-dom"
import { apiUpdateRoomFull } from "~/apis/room"

const UpdatePost = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm()
  const images = watch("images")
  const description = watch("description")
  const { setModal, catalogs } = useAppStore()
  const [post, setPost] = useState()
  const { postId } = useParams()
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    const fetchPost = async () => {
      const response = await apiGetPostById(postId)
      if (response.success) setPost(response.post)
    }
    fetchPost()
  }, [postId, update])
  useEffect(() => {
    if (post)
      reset({
        title: post?.title,
        address: post?.address,
        description: post?.description,
        catalogId: post?.catalogId,
        images: post?.images,
        rooms: post?.rooms,
      })
  }, [post])
  const [rooms, setRooms] = useState([])
  const navigate = useNavigate()
  const handleUpdatePost = async (data) => {
    const payload = { ...data, rooms }
    delete payload.roomfile
    const response = await apiUpdatePost(post?.id, payload)
    if (response.success) {
      toast.success(response.mes)
      navigate(-1)
    } else toast.error(response.mes)
  }
  const getImages = (image = []) => {
    let arrayImages = images || []
    if (image && image.length > 0) arrayImages = [...arrayImages, ...image.map((el) => el.path)]
    setValue("images", arrayImages)
  }
  const updateRoom = async (id, room) => {
    const response = await apiUpdateRoomFull(id, room)
    if (response.success) {
      toast.success(response.mes)
      setUpdate(!update)
    } else toast.error(response.mes)
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-full bg-white max-h-screen overflow-y-auto">
      <div className="w-full h-full">
        <div className="flex justify-between py-4 lg:border-b px-4 items-center">
          <h1 className="text-3xl font-bold">
            Cập nhật tin đăng #<span>{post?.id}</span>
          </h1>
          <Link className="bg-orange-600 px-4 py-2 text-white font-semibold rounded-md" to={-1}>
            Quay lại
          </Link>
        </div>
        <form className="p-4 w-full">
          <h2 className="font-bold text-blue-600 my-4">1. Thông tin tổng quát</h2>
          <div className="flex flex-col gap-4">
            <InputForm
              register={register}
              id="title"
              errors={errors}
              title="Tựa đề"
              validate={{ required: "Không được bỏ trống." }}
            />
            <InputForm
              register={register}
              id="address"
              errors={errors}
              title="Địa chỉ"
              validate={{ required: "Không được bỏ trống." }}
            />
            <InputSelect
              id="catalogId"
              register={register}
              errors={errors}
              title="Thể loại"
              validate={{ required: "Không được bỏ trống." }}
              options={catalogs?.map((el) => ({
                ...el,
                label: el.value,
                value: el.id,
              }))}
            />
            <InputText
              id="description"
              register={register}
              errors={errors}
              validate={{ required: "Không được bỏ trống." }}
              setValue={setValue}
              label="Mô tả chi tiết"
              value={description}
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Hình ảnh</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...new Set(images)]?.map((el, idx) => (
                  <div key={idx} className="col-span-1 relative">
                    <img src={el} className="w-full border object-contain rounded-md" />
                    <span
                      onClick={() =>
                        setValue(
                          "images",
                          images.filter((p) => JSON.stringify(p) !== JSON.stringify(el))
                        )
                      }
                      className="absolute top-1 right-1 p-2 rounded-full text-2xl text-white cursor-pointer"
                    >
                      <RiCloseCircleFill />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <InputFile
              id="images"
              label="Thêm ảnh"
              getImages={(images) => getImages(images)}
              mutilple={true}
              hidden
            />
            <h2 className="font-bold text-blue-600 my-4">2. Chi tiết phòng ở</h2>
            <div className="flex flex-col gap-2">
              <table className="my-4 w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3">Tên phòng</th>
                    <th className="border p-3">Giá thuê</th>
                    <th className="border p-3">Diện tích</th>
                    <th className="border p-3">Ở đối đa</th>
                    <th className="border p-3">Tình trạng</th>
                    <th className="border p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {post?.rRooms?.map((el, idx) => (
                    <tr key={idx}>
                      <td className="text-center border p-3">{el.title}</td>
                      <td className="text-center border p-3">{el.price}</td>
                      <td className="text-center border p-3">{el.area}</td>
                      <td className="text-center border p-3">{el.stayMax}</td>
                      <td className="text-center border p-3">{el.position}</td>
                      <td className="text-center border text-blue-600 p-3">
                        <span className="flex items-center justify-center gap-3">
                          <span
                            className="cursor-pointer"
                            onClick={() =>
                              setModal(
                                true,
                                <EditRoom
                                  updateRoom={updateRoom}
                                  fromPost
                                  setRooms={setRooms}
                                  editRoom={el}
                                />
                              )
                            }
                            title="Chỉnh sửa / Thêm tiện nghi"
                          >
                            <RiFileEditLine size={18} />
                          </span>
                          <span title="Xóa">
                            <RiDeleteBin6Line size={18} />
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="flex flex-col gap-3">
              <label className="italic" htmlFor="rooms">
                Tải file excel danh sách phòng ở (Tải file trường hợp bạn muốn
                thêm phòng ở, nếu muốn chỉnh sửa phòng ở hãy vào mục "Quản lý
                phòng trọ")
              </label>
              <input
                type="file"
                id="rooms"
                className="mb-8"
                {...register("roomfile")}
                onChange={handleReadFileExcel}
              />
              {errors && errors["roomfile"] && (
                <small className="text-xs text-red-600">
                  {errors["roomfile"].message}
                </small>
              )}
            </div>
            {rooms && rooms.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="font-bold">Danh sách phòng ở</h2>
                <table className="my-4 w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3">Tên phòng</th>
                      <th className="border p-3">Giá thuê</th>
                      <th className="border p-3">Diện tích</th>
                      <th className="border p-3">Ở đối đa</th>
                      <th className="border p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((el, idx) => (
                      <tr key={idx}>
                        <td className="text-center border p-3">{el.title}</td>
                        <td className="text-center border p-3">{el.price}</td>
                        <td className="text-center border p-3">{el.area}</td>
                        <td className="text-center border p-3">{el.stayMax}</td>
                        <td className="text-center border text-blue-600 p-3">
                          <span className="flex items-center justify-center gap-3">
                            <span
                              className="cursor-pointer"
                              onClick={() =>
                                setModal(
                                  true,
                                  <EditRoom setRooms={setRooms} editRoom={el} />
                                )
                              }
                              title="Chỉnh sửa / Thêm tiện nghi"
                            >
                              <RiFileEditLine size={18} />
                            </span>
                            <span title="Xóa">
                              <RiDeleteBin6Line size={18} />
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )} */}
          </div>
          <Button onClick={handleSubmit(handleUpdatePost)}>Publish</Button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePost
