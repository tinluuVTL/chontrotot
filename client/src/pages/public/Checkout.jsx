import moment from "moment"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { apiCreatePayment } from "~/apis/payment"
import { Button } from "~/components/commons"
import { InputForm } from "~/components/inputs"
import { Paypal } from "~/components/payments"
import { usePostStore, useUserStore } from "~/store"
import { formatMoney } from "~/utilities/fn"
import pathname from "~/utilities/path"

const Checkout = () => {
  const { checkoutRoom, setContractData } = usePostStore()
  const { current } = useUserStore()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm()
  useEffect(() => {
    reset({ bphone: current?.phone })
  }, [current])
  const onSubmit = async (data) => {
    data.houseaddress = checkoutRoom?.post?.address
    data.price = String(checkoutRoom?.price)
    data.start = moment().format("YYYY-MM-DD")
    data.end = moment().add(30, "days").format("YYYY-MM-DD")
    setContractData(data)
    const payload = {
      roomId: checkoutRoom?.roomId,
      total: checkoutRoom?.price,
      email: watch("email"),
    }
    if (current) payload.userId = current?.id
    const response = await apiCreatePayment(payload)
    if (response.success) {
      toast.success(response.mes)
      // window.open(`/${pathname.user.CONTRACT}`, "_blank")
      navigate(`/${pathname.user.CONTRACT}`)
    } else toast.error(response.mes)
  }
  return (
    <div className="w-full lg:w-main mx-auto p-4">
      <h1 className="text-3xl font-semibold my-4">Thanh toán phòng trọ</h1>
      <div className="flex flex-col gap-2">
        <p>
          Cảm ơn bạn đã sử dụng dich vụ của chúng tôi. Chúng tôi xin xác nhận lại phòng bạn đã chọn như sau:
        </p>
        <span className="mt-6">
          Tin đăng: <span className="text-orange-600">{checkoutRoom?.post?.title}</span>
        </span>
        <span>
          Phòng ở đã chọn: <span className="text-orange-600">{checkoutRoom?.title}</span>
        </span>
        <span className="mb-6">
          Giá thanh toán: <span className="text-orange-600">{formatMoney(checkoutRoom?.price) + " VNĐ"}</span>
        </span>
        <span>
          Vui lòng nhập địa chỉ Email của bạn để chúng tôi gửi thông báo về cho bạn sau khi thanh toán thành
          công.
        </span>
        <InputForm
          id="email"
          register={register}
          errors={errors}
          validate={{ required: "Hãy nhập email" }}
          placeholder="Nhập email của bạn"
        />
        <form className="w-full my-4">
          <h1 className="font-bold my-4 text-blue-600 underline">Thông tin hợp đồng:</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
            <InputForm
              id="bName"
              register={register}
              errors={errors}
              validate={{ required: "Không được bỏ trống." }}
              title="Tên đầy đủ"
              containerClassName="col-span-1"
            />
            <InputForm
              id="bBirthday"
              register={register}
              errors={errors}
              validate={{ required: "Không được bỏ trống." }}
              containerClassName="col-span-1"
              type="date"
              title="Ngày tháng năm sinh"
            />
            <InputForm
              id="bAddress"
              register={register}
              errors={errors}
              validate={{ required: "Không được bỏ trống." }}
              title="Hộ khẩu thường trú"
              containerClassName="col-span-1"
            />
            <InputForm
              id="bcccd"
              register={register}
              errors={errors}
              validate={{ required: "Không được bỏ trống." }}
              title="CCCD"
              containerClassName="col-span-1"
            />
            <InputForm
              id="bcccddate"
              register={register}
              errors={errors}
              validate={{ required: "Không được bỏ trống." }}
              title="Cấp ngày"
              containerClassName="col-span-1"
              type="date"
            />
            <InputForm
              id="bcccdaddress"
              register={register}
              errors={errors}
              validate={{ required: "Không được bỏ trống." }}
              title="Cấp tại"
              containerClassName="col-span-1"
            />
            <InputForm
              id="bphone"
              register={register}
              errors={errors}
              validate={{ required: "Không được bỏ trống." }}
              title="Số điện thoại liên hệ"
              containerClassName="col-span-1"
            />
          </div>
        </form>
        <div onClick={handleSubmit(onSubmit)} className="w-full flex justify-center my-6">
          <Button>Tạo hợp đồng</Button>
        </div>
        {/* {isSubmit && (
          <div className="w-full my-12">
            <Paypal
              payload={{
                roomId: checkoutRoom?.roomId,
                total: checkoutRoom?.price,
                email: watch("email"),
              }}
              amount={checkoutRoom?.price}
            />
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Checkout
