import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "~/components/commons"
import { InputFile, InputForm, InputSelect, InputText } from "~/components/inputs"
import { useAppStore, useUserStore } from "~/store"
import readXlsxFile from "read-excel-file"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { RiDeleteBin6Line, RiFileEditLine } from "react-icons/ri"
import { EditRoom } from "~/components/user"
import { apiCreateNewPost } from "~/apis/post"
import { CreateRoom } from "~/components/posts"
import { Navigate } from "react-router-dom"
import pathname from "~/utilities/path"

const CreatePost = () => {
  const { resetImages, current } = useUserStore()
  if (
    !current?.rprofile ||
    !current.rprofile?.firstName ||
    !current.rprofile?.lastName ||
    !current.rprofile?.CID ||
    !current.rprofile?.address
  ) {
    Swal.fire({
      icon: "warning",
      title: "Yêu cầu xác thực",
      text: "Bạn phải cập nhật đầy đủ thông tin chủ trọ trước khi đăng bài.",
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: "Tôi biết rồi",
    })
    return <Navigate to={`/${pathname.user.LAYOUT}/${pathname.user.PROFILE}`} />
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm()
  const { setModal } = useAppStore()
  const { catalogs } = useAppStore()
  const [rooms, setRooms] = useState([])
  const [createRoomMode, setCreateRoomMode] = useState("FILE")
  const handleReadFileExcel = async (e) => {
    const file = e.target.files[0]
    if (!file.type.includes("spreadsheetml.sheet")) return Swal.fire("Oops!", "Chỉ hỗ trợ file Excel", "info")
    const rows = await readXlsxFile(file)
    if (rows && rows.length > 0) {
      const roomData = []
      for (let row of rows) {
        if (row[0] === "ROOM")
          roomData.push({
            title: row[1],
            price: row[2],
            area: row[3],
            stayMax: row[4],
            electricPrice: row[5],
            waterPrice: row[6],
            capsPrice: row[7],
            internetPrice: row[8],
          })
      }
      setRooms(roomData)
    } else toast.warn("File rỗng.")
  }
  const handlePublishPost = async (data) => {
    const payload = { ...data, rooms }
    delete payload.roomfile
    const response = await apiCreateNewPost(payload)
    if (response.success) {
      toast.success(response.mes)
      reset()
      setRooms([])
      resetImages(true)
    } else toast.error(response.mes)
  }
  const handleRemoveRoom = (name) => {
    setRooms((prev) => prev.filter((el) => el.title !== name))
  }
  const handleAddRoom = (room) => {
    if (rooms.some((el) => el.title === room.title)) {
      toast.warning("Tên phòng đã sử dụng")
    } else {
      setRooms((prev) => [...prev, room])
    }
  }
  return (
    <div className="w-full h-full">
      <div className="flex justify-between py-4 lg:border-b px-4 items-center">
        <h1 className="text-3xl font-bold">Tạo mới tin đăng</h1>
        <Button onClick={handleSubmit(handlePublishPost)}>Publish</Button>
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
          />
          <InputFile
            id="images"
            label="Hình ảnh"
            getImages={(images) =>
              setValue(
                "images",
                images?.map((el) => el.path)
              )
            }
            mutilple={true}
          />
          <h2 className="font-bold text-blue-600 my-4">2. Chi tiết phòng ở</h2>
          <div className="flex flex-col gap-3">
            <span>
              Bạn <span>{createRoomMode === "FILE" && "không"}</span> có file?{" "}
              {createRoomMode === "FILE" && (
                <span
                  onClick={() => setCreateRoomMode("MANUAL")}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Thêm trực tiếp
                </span>
              )}
              {createRoomMode === "MANUAL" && (
                <span
                  onClick={() => setCreateRoomMode("FILE")}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Thêm bằng file
                </span>
              )}
            </span>
            {createRoomMode === "FILE" && (
              <>
                <label className="italic" htmlFor="rooms">
                  Tải file excel danh sách phòng ở
                </label>
                <input
                  type="file"
                  id="rooms"
                  className="mb-8"
                  {...register("roomfile")}
                  onChange={handleReadFileExcel}
                />
                {errors && errors["roomfile"] && (
                  <small className="text-xs text-red-600">{errors["roomfile"].message}</small>
                )}
              </>
            )}
            {createRoomMode === "MANUAL" && (
              <Button
                className="w-fit"
                onClick={() => setModal(true, <CreateRoom pushRoom={handleAddRoom} />)}
              >
                Thêm phòng
              </Button>
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
                            onClick={() => setModal(true, <EditRoom setRooms={setRooms} editRoom={el} />)}
                            title="Chỉnh sửa / Thêm tiện nghi"
                          >
                            <RiFileEditLine size={18} />
                          </span>
                          <span onClick={() => handleRemoveRoom(el.title)} title="Xóa">
                            <RiDeleteBin6Line size={18} />
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreatePost
