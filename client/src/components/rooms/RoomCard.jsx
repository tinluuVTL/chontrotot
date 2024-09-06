import React from "react"
import { formatMoney } from "~/utilities/fn"
import { Button } from "../commons"
import Swal from "sweetalert2"
import { createSearchParams, useNavigate } from "react-router-dom"
import pathname from "~/utilities/path"
import { usePostStore, useUserStore } from "~/store"

const RoomCard = ({
  id,
  area,
  price,
  rConvenients,
  stayMax,
  position,
  title,
  post,
  electricPrice,
  waterPrice,
  capsPrice,
  internetPrice,
}) => {
  const navigate = useNavigate()
  const { setCheckoutRoom, setOwnerData } = usePostStore()
  const { current } = useUserStore()
  const handleOrder = async () => {
    if (!current)
      return Swal.fire({
        title: "Oops!",
        text: "Bạn vui lòng đăng nhập trước khi thuê phòng",
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Quay lại",
        showConfirmButton: true,
        confirmButtonText: "Đi tới đăng nhập",
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate({
            pathname: `/${pathname.public.LOGIN}`,
            search: createSearchParams({ from: location.pathname }).toString(),
          })
        }
      })
    Swal.fire({
      title: "Xác nhận thuê phòng",
      text: `Bạn chắc chắn muốn thuê phòng ${title}? Hãy thanh toán trước ${
        formatMoney(price) + " VNĐ"
      } (1 tháng). Chúng tôi sẽ gửi xuất ra hợp đồng cho bạn. Xin hãy đem hợp đồng tới gặp chủ trọ để hoàn tất quá trình thuê. Xin cảm ơn`,
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Quay lại",
      showConfirmButton: true,
      confirmButtonText: "Đi tới thanh toán",
    }).then((rs) => {
      if (rs.isConfirmed) {
        console.log({
          ownername: post?.rUser?.rprofile?.firstName + " " + post?.rUser?.rprofile?.lastName,
          owneraddress: post?.rUser?.rprofile?.address,
          ownercid: post?.rUser?.rprofile?.CID,
          ownerphone: post?.rUser?.phone,
        })
        setOwnerData({
          ownername: (post?.rUser?.rprofile?.firstName || "") + " " + (post?.rUser?.rprofile?.lastName || ""),
          owneraddress: post?.rUser?.rprofile?.address || "",
          ownercid: post?.rUser?.rprofile?.CID || "",
          ownerphone: post?.rUser?.phone,
        })
        setCheckoutRoom({ title, price, post, roomId: id })
        navigate(`/${pathname.public.CHECKOUT}`)
      }
    })
  }
  return (
    <div className="col-span-1 border flex flex-col border-blue-600 rounded-md">
      <div className="py-4 text-center rounded-t-md font-semibold bg-blue-600 text-white px-6">{title}</div>
      <div className="flex flex-col flex-auto gap-2 p-4 items-center justify-between">
        <div className="flex flex-col gap-2">
          <span>
            🗝️ ID: <span className="font-bold text-orange-600">{id}</span>
          </span>
          <span>
            💶 Giá thuê / tháng:{" "}
            <span className="font-bold text-orange-600">{formatMoney(+price) + " VNĐ"}</span>
          </span>
          <span>
            ⚡ Giá điện:{" "}
            <span className="font-bold text-orange-600">{formatMoney(+electricPrice) + " VNĐ/kWh"}</span>
          </span>
          <span>
            💧 Giá nước:{" "}
            <span className="font-bold text-orange-600">
              {formatMoney(+waterPrice) + " VNĐ/"}
              <span>
                m<sup>3</sup>
              </span>
            </span>
          </span>
          <span>
            🖥️ Giá cáp truyền hình:{" "}
            <span className="font-bold text-orange-600">{formatMoney(+capsPrice) + " VNĐ/tháng"}</span>
          </span>
          <span>
            🌐 Giá internet:{" "}
            <span className="font-bold text-orange-600">{formatMoney(+internetPrice) + " VNĐ/tháng"}</span>
          </span>
          <span>
            🔲 Diện tích:{" "}
            <span className="font-bold text-orange-600">
              {area}{" "}
              <span>
                m<sup>2</sup>
              </span>
            </span>
          </span>
          <span>
            👨‍👩‍👧‍👧 Số người ở tối đa: <span className="font-bold text-orange-600">{stayMax}</span>
          </span>
          <span>
            ✅ Trạng thái: <span className="font-bold text-orange-600">{position}</span>
          </span>
          <div className="flex flex-col mt-4 gap-2">
            <span className="text-blue-600 underline">Tiện nghi:</span>
            <div className="grid grid-cols-2 gap-4">
              {[...new Set(rConvenients?.map((c) => JSON.stringify({ rValues: c.rValues })))]
                ?.map((el) => JSON.parse(el))
                ?.map((el, idx) => (
                  <span key={idx} className="flex gap-2 items-center text-sm">
                    <img src={el.rValues?.image} alt="" className="w-6 h-6 object-cover" />
                    <span>{el.rValues?.name}</span>
                  </span>
                ))}
            </div>
          </div>
        </div>
        {position === "Còn trống" && (
          <div className="my-4 w-full">
            <Button
              onClick={handleOrder}
              className="bg-transparent border w-full font-medium border-blue-600 text-blue-600"
            >
              Thuê phòng
            </Button>
          </div>
        )}
        {position === "Đã thuê" && (
          <div className="my-4 w-full">
            <Button className="bg-orange-600 border w-full font-medium border-orange-600 text-white">
              {position}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoomCard
