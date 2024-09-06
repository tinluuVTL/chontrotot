import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import moment from "moment"
import React from "react"
import { formatMoney } from "~/utilities/fn"
import { Button } from "../commons"

const Invoice = ({ counter, room }) => {
  const printDocument = () => {
    const input = document.getElementById("divToPrint")
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
      })
      pdf.addImage(imgData, "JPEG", 0, 0)
      // pdf.output('dataurlnewwindow');
      pdf.save(Date.now() + "-hoa-don-dich-vu.pdf")
    })
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className="bg-white overflow-x-auto rounded-md p-4">
      <div id="divToPrint" className="bg-white w-full lg:min-w-[800px] text-black p-8 mx-auto">
        <div className="text-center font-semibold text-3xl">Hoá đơn sử dụng dịch vụ</div>
        <div className="my-8 flex flex-col gap-3 p-4">
          <span>
            Người thuê:{" "}
            <span className="font-semibold">
              {room?.rContract[0]?.rUser?.rprofile?.firstName +
                " " +
                room?.rContract[0]?.rUser?.rprofile?.lastName}
            </span>
          </span>
          <span>
            Phòng ở: <span className="font-semibold text-blue-600">{room.title}</span>
          </span>
          <table>
            <thead>
              <tr>
                <th className="border p-3 text-center">Ngày ghi sổ</th>
                <th className="border p-3 text-center">Dịch vụ</th>
                <th className="border p-3 text-center">Chỉ số</th>
                <th className="border p-3 text-center">Giá dịch vụ</th>
                <th className="border p-3 text-center">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3 text-center">{moment(counter.date).format("DD/MM/YYYY")}</td>
                <td className="border p-3 text-center">
                  <span className="flex flex-col gap-2">
                    <span>Điện</span>
                    <span>Nước</span>
                    <span>Cap truyền hình</span>
                    <span>Internet</span>
                  </span>
                </td>
                <td className="border p-3 text-center">
                  <span className="flex flex-col gap-2">
                    <span>{counter.electric}</span>
                    <span>{counter.water}</span>
                    <span>{counter.caps ? "Có" : "Không"}</span>
                    <span>{counter.internet ? "Có" : "Không"}</span>
                  </span>
                </td>
                <td className="border p-3 text-center">
                  <span className="flex flex-col gap-2">
                    <span>{formatMoney(room.electricPrice) + "/kWh"}</span>
                    <span>{formatMoney(room.waterPrice) + "/khối"}</span>
                    <span>{formatMoney(room.capsPrice) + "/tháng"}</span>
                    <span>{formatMoney(room.internetPrice) + "/tháng"}</span>
                  </span>
                </td>
                <td className="border p-3 text-center">
                  <span className="flex flex-col gap-2">
                    <span>{formatMoney(counter.electric * room.electricPrice)}</span>
                    <span>{formatMoney(counter.water * room.waterPrice)}</span>
                    <span>{formatMoney(room.capsPrice)}</span>
                    <span>{formatMoney(room.internetPrice)}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-between my-4">
            <span>Số tiền cần thanh toán:</span>
            <span className="font-bold text-xl">
              {formatMoney(
                counter.electric * room.electricPrice +
                  counter.water * room.waterPrice +
                  room.capsPrice * 1 +
                  room.internetPrice * 1
              ) + " VND"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center my-4">
        <Button onClick={() => printDocument()}>Xuất hóa đơn</Button>
      </div>
    </div>
  )
}

export default Invoice
