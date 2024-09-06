import React, { useEffect } from "react"
import { InputForm, InputSelect } from "../inputs"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import pathname from "~/utilities/path"
import moment from "moment"
import { formatMoney } from "~/utilities/fn"
import { Button } from "../commons"
import { apiUpdateRoom } from "~/apis/room"
import { toast } from "react-toastify"
import { useAppStore } from "~/store"
import { LiaFileInvoiceDollarSolid } from "react-icons/lia"
import { IoCheckbox, IoCheckboxOutline } from "react-icons/io5"
import { Invoice } from "."
import { apiUpdatePaymentIndex } from "~/apis/user"

const DetailRoom = ({ room }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm()
  const { setModal } = useAppStore()
  useEffect(() => {
    if (room) {
      reset({
        price: room?.price,
        area: room?.area,
        position: room?.position,
        electricPrice: room?.electricPrice,
        waterPrice: room?.waterPrice,
        capsPrice: room?.capsPrice,
        internetPrice: room?.internetPrice,
        stayMax: room?.stayMax,
      })
    }
  }, [room])
  const handleUpdateRoom = async (data) => {
    const response = await apiUpdateRoom(room.id, data)
    if (response.success) {
      toast.success(response.mes)
      setModal(false, null)
    } else toast.error(response.mes)
  }
  const handleUpdatePayment = async (id, total) => {
    const response = await apiUpdatePaymentIndex(id, {
      userId: room?.rContract[0]?.rUser?.id,
      roomId: room?.id,
      total,
      status: "Thành công",
    })
    if (response.success) {
      toast.success(response.mes)
      setModal(false, null)
    } else toast.error(response.mes)
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[90%] md:w-[70%] pb-[100px] lg:w-[550px] max-h-[90vh] overflow-y-auto bg-white rounded-md"
    >
      <h1 className="text-2xl font-semibold p-4 border-b">
        Chi tiết phòng <span className="text-blue-600">{room?.title}</span>
      </h1>
      <div className="p-4">
        Phòng trọ đang thuộc tin đăng{" "}
        <Link
          to={`/${pathname.public.DETAIL_POST}/${room?.rPost?.id}/${room?.rPost?.title}`}
          className="text-blue-600 hover:underline"
        >
          {room?.rPost?.title}
        </Link>
      </div>
      <form className="p-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputForm
          id="price"
          register={register}
          errors={errors}
          title="Giá thuê / tháng"
          validate={{ required: "Không được bỏ trống" }}
          type="number"
        />
        <InputForm
          id="area"
          register={register}
          errors={errors}
          title="Diện tích"
          validate={{ required: "Không được bỏ trống" }}
          type="number"
        />
        <InputSelect
          id="position"
          register={register}
          errors={errors}
          title="Trạng thái"
          validate={{ required: "Không được bỏ trống" }}
          options={[
            { label: "Đang xử lý", value: "Đang xử lý" },
            { label: "Còn trống", value: "Còn trống" },
            { label: "Đã thuê", value: "Đã thuê" },
          ]}
        />
        <InputForm
          id="electricPrice"
          register={register}
          errors={errors}
          title="Giá điện / kWh"
          validate={{ required: "Không được bỏ trống" }}
          type="number"
        />
        <InputForm
          id="waterPrice"
          register={register}
          errors={errors}
          title="Giá nước / kWh"
          validate={{ required: "Không được bỏ trống" }}
          type="number"
        />
        <InputForm
          id="capsPrice"
          register={register}
          errors={errors}
          title="Giá cáp / tháng"
          validate={{ required: "Không được bỏ trống" }}
          type="number"
        />
        <InputForm
          id="internetPrice"
          register={register}
          errors={errors}
          title="Giá internet / tháng"
          validate={{ required: "Không được bỏ trống" }}
          type="number"
        />
        <InputForm
          id="stayMax"
          register={register}
          errors={errors}
          title="Số người ở tối đa"
          validate={{ required: "Không được bỏ trống" }}
          type="number"
        />
        {isDirty && <Button onClick={handleSubmit(handleUpdateRoom)}>Cập nhật</Button>}
      </form>
      <div className="p-4 w-full">
        <h3 className="font-semibold mb-4">Chỉ số tiện nghi</h3>
        <table className="max-w-full w-full overflow-x-auto">
          <thead>
            <tr>
              <th className="border p-3 text-center">Ngày ghi</th>
              <th className="border p-3 text-center">Điện (kWh)</th>
              <th className="border p-3 text-center">Nước (khối)</th>
              <th className="border p-3 text-center">Caps</th>
              <th className="border p-3 text-center">Internet</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {room?.rCounter?.map((el) => (
              <tr key={el.id}>
                <td className="border p-3 text-center">{moment(el.date).format("DD/MM/YY")}</td>
                <td className="border p-3 text-center">{el.electric}</td>
                <td className="border p-3 text-center">{el.water}</td>
                <td className="border p-3 text-center">{el.caps ? "✔️" : "❌"}</td>
                <td className="border p-3 text-center">{el.internet ? "✔️" : "❌"}</td>
                <td className="flex items-center gap-2 border p-3 text-center">
                  {el.isPayment ? (
                    <span
                      title="Đã thanh toán"
                      // onClick={() => handleUpdatePayment(el.id)}
                      className="flex justify-center items-center hover:text-blue-600"
                    >
                      <IoCheckbox size={20} color="green" />
                    </span>
                  ) : (
                    <span
                      title="Chưa thanh toán"
                      onClick={() =>
                        handleUpdatePayment(
                          el.id,
                          el.electric * room?.electricPrice +
                            el.water * room?.waterPrice +
                            (el.internet ? 1 : 0) * room?.internetPrice +
                            (el.caps ? 1 : 0) * room?.capsPrice
                        )
                      }
                      className="flex justify-center items-center cursor-pointer hover:text-blue-600"
                    >
                      <IoCheckboxOutline size={20} />
                    </span>
                  )}
                  <span
                    title="Xuất hóa đơn"
                    onClick={() => setModal(true, <Invoice counter={el} room={room} />)}
                    className="flex justify-center items-center cursor-pointer hover:text-blue-600"
                  >
                    <LiaFileInvoiceDollarSolid size={20} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 w-full">
        <h3 className="font-semibold mb-4">Lịch sử thanh toán</h3>
        <table className="max-w-full w-full overflow-x-auto">
          <thead>
            <tr>
              <th className="border p-3 text-center">Ngày thanh toán</th>
              <th className="border p-3 text-center">Người thanh toán</th>
              <th className="border p-3 text-center">Số tiền</th>
              <th className="border p-3 text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {room?.rPayment?.map((el) => (
              <tr key={el.id}>
                <td className="border p-3 text-center">{moment(el.createdAt).format("DD/MM/YY")}</td>
                <td className="border p-3 text-center">{el.rUser?.phone}</td>
                <td className="border p-3 text-center">{formatMoney(el.total)}</td>
                <td className="border p-3 text-center">{el.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DetailRoom
