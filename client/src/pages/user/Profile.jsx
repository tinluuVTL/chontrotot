import React, { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { apiUpdateProfile } from "~/apis/user"
import { Button } from "~/components/commons"
import { InputFile, InputForm, InputSelect } from "~/components/inputs"
import { useUserStore } from "~/store"
import { genders } from "~/utilities/constant"

const Profile = () => {
  const { current, getCurrent, resetImages } = useUserStore()
  const titleRef = useRef()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm()
  useEffect(() => {
    if (current) {
      reset({
        phone: current.phone,
        username: current.username,
        firstName: current.rprofile?.firstName,
        lastName: current.rprofile?.lastName,
        address: current.rprofile?.address,
        email: current.rprofile?.email,
        gender: current.rprofile?.gender,
        image: current.rprofile?.image,
        CID: current.rprofile?.CID,
      })
    }
  }, [current])
  const handleUpdateProfile = async (data) => {
    const response = await apiUpdateProfile(data)
    if (response.success) {
      toast.success(response.mes)
      getCurrent()
      resetImages(true)
      titleRef.current.scrollIntoView({ block: "center" })
    } else toast.error(response.mes)
  }
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <h1 ref={titleRef} className="text-3xl font-bold mt-4 py-4 px-4">
        Thông tin cá nhân
      </h1>
      <form className="p-4 w-full lg:w-3/5 flex flex-col items-center gap-4">
        <InputForm
          id="username"
          register={register}
          errors={errors}
          validate={{ required: "Trường này không dược bỏ trống." }}
          title="Username"
        />
        <InputForm
          id="phone"
          register={register}
          errors={errors}
          validate={{ required: "Trường này không dược bỏ trống." }}
          title="Số điện  thoại"
          readOnly={!current?.rroles?.some((el) => el.roleCode === "USER")}
        />
        <InputForm id="firstName" register={register} errors={errors} title="Họ và tên đệm" />
        <InputForm id="lastName" register={register} errors={errors} title="Tên" />
        <InputForm id="CID" register={register} errors={errors} title="CCCD" />
        <InputForm id="address" register={register} errors={errors} title="Địa chỉ hiện tại" />
        <InputForm id="email" register={register} errors={errors} title="Địa chỉ email" />
        <InputSelect
          id="gender"
          register={register}
          errors={errors}
          title="Giới tính"
          isForm
          options={genders.map((el) => ({ ...el, label: el.value }))}
        />
        {current?.rprofile?.image && (
          <div className="flex flex-col gap-2 w-full">
            <span className="font-medium text-main-700">Ảnh dại diện hiện tại</span>
            <img src={current?.rprofile?.image} alt="" className="w-24 h-24 object-cover rounded-full" />
          </div>
        )}
        <InputFile
          id="image"
          label="Đổi ảnh đại diện"
          getImages={(images) => setValue("image", images[0]?.path)}
        />
        <Button onClick={handleSubmit(handleUpdateProfile)} className="mt-4 mb-8 lg:w-fit text-center">
          Cập nhật
        </Button>
      </form>
    </div>
  )
}

export default Profile
