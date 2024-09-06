import React from "react"
import { useForm } from "react-hook-form"
import { InputCheckbox, InputForm } from "../inputs"
import { Button } from "../commons"
import { apiAddIndexCounter } from "~/apis/room"
import { toast } from "react-toastify"

const UpdateIndex = ({ room }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm()
  const services = watch("services")
  const handleAddIndex = async (data) => {
    data.roomId = room.id
    if (!data.services) data.services = []
    const response = await apiAddIndexCounter(data)
    if (response.success) {
      toast.success(response.mes)
      reset()
    } else toast.error(response.mes)
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[90%] md:w-[70%] pb-[100px] lg:w-[550px] max-h-[90vh] overflow-y-auto bg-white rounded-md"
    >
      <h1 className="text-2xl font-semibold p-4 border-b">
        Cập nhật chỉ số phòng <span className="text-blue-600">{room?.title}</span>
      </h1>
      <form className="p-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputForm
          id="date"
          register={register}
          errors={errors}
          validate={{ required: "Không được bỏ  trống" }}
          title="Ngày ghi nhận"
          type="date"
        />
        <InputForm
          id="electric"
          register={register}
          errors={errors}
          validate={{ required: "Không được bỏ  trống" }}
          title="Chỉ số điện (kWh)"
        />
        <InputForm
          id="water"
          register={register}
          errors={errors}
          validate={{ required: "Không được bỏ  trống" }}
          title="Chỉ số nước (khối)"
        />
        <InputCheckbox
          id="services"
          register={register}
          errors={errors}
          title="Tiện nghi khác"
          values={services}
          options={[
            { label: "Dịch vụ truyền hình", value: "caps", code: "caps" },
            { label: "Dịch vụ internet", value: "internet", code: "internet" },
          ]}
        />
        <Button onClick={handleSubmit(handleAddIndex)}>Cập nhật</Button>
      </form>
    </div>
  )
}

export default UpdateIndex
