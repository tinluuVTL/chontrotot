import moment from "moment"
import React, { useEffect, useState } from "react"
import { apiGetIndexCounterByRoomId } from "~/apis/user"
import { formatMoney } from "~/utilities/fn"

const IndexCounterDetail = ({ roomId, roomPrices }) => {
  const [counter, setCounter] = useState()
  useEffect(() => {
    const fetchIndexCounter = async () => {
      const response = await apiGetIndexCounterByRoomId(roomId)
      if (response.success) setCounter(response.indexCounter)
    }
    fetchIndexCounter()
  }, [roomId])
  return (
    <>
      {roomId && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[95%] md:w-[700px] max-h-[95vh] overflow-y-auto p-4 rounded-md bg-white"
        >
          <h1 className="pb-4 text-xl font-bold border-b">Chi tiết chỉ số</h1>
          <table className="my-6 w-full">
            <thead>
              <tr>
                <th className="border p-3 text-center">Ngày ghi sổ</th>
                <th className="border p-3 text-center">Chỉ số điện (kWh x vnđ)</th>
                <th className="border p-3 text-center">
                  Chỉ số nước (
                  <span>
                    m<sup>3</sup> x vnđ
                  </span>
                  )
                </th>
                <th className="border p-3 text-center">Dùng internet (vnđ)</th>
                <th className="border p-3 text-center">Dùng truyền hình cap (vnđ)</th>
                <th className="border p-3 text-center">Thành tiền (vnđ)</th>
                <th className="border p-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {counter?.map((el) => (
                <tr key={el.id}>
                  <td className="border p-3 text-center">{moment(el.date).format("DD/MM/YYYY")}</td>
                  <td className="border p-3 text-center">{`${formatMoney(el.electric)} x ${formatMoney(
                    roomPrices?.electricPrice
                  )}`}</td>
                  <td className="border p-3 text-center">{`${formatMoney(el.water)} x ${formatMoney(
                    roomPrices?.waterPrice
                  )}`}</td>
                  <td className="border p-3 text-center">
                    {el.internet ? formatMoney(roomPrices?.internetPrice) : 0}
                  </td>
                  <td className="border p-3 text-center">
                    {el.caps ? formatMoney(roomPrices?.capsPrice) : 0}
                  </td>
                  <td className="border p-3 text-center">
                    {formatMoney(
                      el.electric * roomPrices?.electricPrice +
                        el.water * roomPrices?.waterPrice +
                        (el.internet ? 1 : 0) * roomPrices?.internetPrice +
                        (el.caps ? 1 : 0) * roomPrices?.capsPrice
                    )}
                  </td>
                  <td className="border p-3 text-center">
                    {el.isPayment ? "Đã thanh toán" : "Chưa thanh toán"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default IndexCounterDetail
