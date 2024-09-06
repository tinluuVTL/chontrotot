import moment from "moment"
import React, { useEffect } from "react"
import { InputCheckbox, InputFile, InputForm, InputSelect } from "../inputs"
import { genders } from "~/utilities/constant"
import { Button } from "../commons"
import { useForm } from "react-hook-form"
import { useAppStore } from "~/store"
import { apiUpdateUser } from "~/apis/user"
import { toast } from "react-toastify"

const UpdateUser = ({ user }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm()
  const { roles, setModal } = useAppStore()
  const role = watch("role")
  useEffect(() => {
    if (user) {
      reset({
        phone: user.phone,
        username: user.username,
        firstName: user.rprofile?.firstName,
        lastName: user.rprofile?.lastName,
        address: user.rprofile?.address,
        email: user.rprofile?.email,
        gender: user.rprofile?.gender,
        image: user.rprofile?.image,
        role: user.rroles?.map((el) => el.roleCode),
      })
    }
  }, [user])
  const handleUpdateUser = async (data) => {
    const response = await apiUpdateUser(user.id, data)
    if (response.success) {
      setModal(false, null)
      toast.success(response.mes)
    } else toast.error(response.mes)
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="lg:w-[600px] flex bg-white w-4/5 rounded-md items-center justify-center flex-col"
    >
      <h1 className="text-3xl font-bold mt-4 py-4 px-4">Cập nhật thành viên</h1>
      <form className="p-4 px-8 max-h-[80vh] overflow-y-auto w-full flex flex-col items-center gap-4">
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
          readOnly={!user?.rroles?.some((el) => el.roleCode === "USER")}
        />
        <InputCheckbox
          id="role"
          register={register}
          errors={errors}
          title="Vai trò"
          isForm
          values={role}
          optionsClassName="flex-row flex items-center gap-12"
          options={roles.map((el) => ({ ...el, label: el.value, value: el.code }))}
        />
        <InputForm id="firstName" register={register} errors={errors} title="Họ và tên đệm" />
        <InputForm id="lastName" register={register} errors={errors} title="Tên" />
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
        {user?.rprofile?.image && (
          <div className="flex flex-col gap-2 w-full">
            <span className="font-medium text-main-700">Ảnh dại diện hiện tại</span>
            <img src={user?.rprofile?.image} alt="" className="w-24 h-24 object-cover rounded-full" />
          </div>
        )}
        <InputFile
          id="image"
          label="Đổi ảnh đại diện"
          getImages={(images) => setValue("image", images[0]?.path)}
        />
        <Button onClick={handleSubmit(handleUpdateUser)} className="mt-4 mb-8 lg:w-fit text-center">
          Cập nhật
        </Button>
      </form>
    </div>
  )
}

export default UpdateUser
