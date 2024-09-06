import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { apiCreateContract } from "~/apis/contract"
import { apiGetRooms } from "~/apis/room"
import { apiGetUsersByManager } from "~/apis/user"
import { Button } from "~/components/commons"
import { CustomReactSelect, InputForm, Textarea } from "~/components/inputs"
import { useUserStore } from "~/store"
import pathname from "~/utilities/path"

const CreateContract = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm()
  const navigate = useNavigate()
  const user = watch("user")
  const room = watch("room")
  const { current } = useUserStore()
  const [userOptions, setUserOptions] = useState([])
  const [rooms, setRooms] = useState([])
  const fetchUsers = async () => {
    const response = await apiGetUsersByManager()
    if (response.success) {
      const options = response.users
        ?.filter((el) => el.id !== current?.id)
        ?.map((el) => ({
          value: el.id,
          label: `${el.phone} - ${el.username}`,
          profile: el.rprofile,
        }))
      setUserOptions(options)
    }
  }
  const fetchRooms = async () => {
    const response = await apiGetRooms({
      postedBy: current?.id,
      fields: "title,id",
    })
    if (response.success) {
      const options = response.rooms?.map((el) => ({
        value: el.id,
        label: `#${el.id} - ${el.title}`,
      }))

      setRooms(options)
    }
  }
  useEffect(() => {
    if (user && user.profile) {
      reset({
        address: user.profile?.address,
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
        CID: user.profile?.CID,
      })
    }
  }, [user])
  useEffect(() => {
    fetchUsers()
    fetchRooms()
  }, [])
  const onSubmit = async (data) => {
    const { room, user, ...payload } = data
    payload.roomId = room.value
    payload.userId = user.value
    const response = await apiCreateContract(payload)
    if (response.success) {
      toast.success(response.mes)
      navigate(`/${pathname.manager.LAYOUT}/${pathname.manager.MANAGE_CONTRACT}`)
    } else toast.error(response.mes)
  }

  return (
    <div className="w-full h-hull">
      <div className="py-4 lg:border-b flex items-center justify-between flex-wrap gap-4 px-4 w-full">
        <h1 className="text-3xl font-bold">Thêm hợp đồng</h1>
      </div>
      <form className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CustomReactSelect
          register={register}
          id="user"
          errors={errors}
          label="Người thuê"
          options={userOptions}
          validate={{ required: "Không được bỏ trống" }}
          value={user}
          onChange={(val) => setValue("user", val)}
        />
        <InputForm
          id="firstName"
          register={register}
          errors={errors}
          validate={{ required: "Không đươc bỏ trống" }}
          title="Họ và tên đệm"
        />
        <InputForm
          id="lastName"
          register={register}
          errors={errors}
          validate={{ required: "Không đươc bỏ trống" }}
          title="Tên"
        />
        <InputForm
          id="CID"
          register={register}
          errors={errors}
          validate={{ required: "Không đươc bỏ trống" }}
          title="CCCD"
        />
        <InputForm
          id="address"
          register={register}
          errors={errors}
          validate={{ required: "Không đươc bỏ trống" }}
          title="Địa chỉ thường trú"
        />
        <CustomReactSelect
          register={register}
          id="room"
          errors={errors}
          label="Phòng cho thuê"
          options={rooms}
          validate={{ required: "Không được bỏ trống" }}
          value={room}
          onChange={(val) => setValue("room", val)}
        />
        <InputForm
          id="expiredAt"
          register={register}
          errors={errors}
          validate={{ required: "Không đươc bỏ trống" }}
          title="Ngày hết hạn"
          type="date"
        />
        <InputForm
          id="preMoney"
          register={register}
          errors={errors}
          validate={{ required: "Không đươc bỏ trống" }}
          title="Tiền đã đặt cọc"
          type="number"
        />
        <InputForm
          id="stayNumber"
          register={register}
          errors={errors}
          validate={{ required: "Không đươc bỏ trống" }}
          title="Số người ở trọ"
          type="number"
        />
        <Textarea
          id="notes"
          register={register}
          errors={errors}
          validate={{ required: "Không đươc bỏ trống" }}
          label="Ghi chú"
          containerClassname="col-span-1 md:col-span-2 lg:col-span-3"
        />
        <Button className="w-fit" onClick={handleSubmit(onSubmit)}>
          Thêm
        </Button>
      </form>
    </div>
  )
}

export default CreateContract
