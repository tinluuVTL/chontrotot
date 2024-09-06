import moment from "moment"
import React from "react"

const RentedList = ({ user }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[90%] md:w-[70%] pb-[100px] lg:w-[550px] max-h-[90vh] overflow-y-auto bg-white rounded-md"
    >
      <h1 className="text-2xl font-semibold p-4 border-b">
        Danh sách phòng đã thuê của <span>{`${user?.rprofile?.firstName} ${user?.rprofile?.lastName}`}</span>
      </h1>
      <div className="p-4 w-full flex flex-col gap-4">
        {user?.rContracts?.map((el) => (
          <div className="rounded-md p-4 flex flex-col bg-blue-50 border" key={el.id}>
            <span>
              Hợp đồng số: <span className="font-bold">{el.id}</span>
            </span>
            <span>
              Số phòng: <span className="font-bold">{el.roomId}</span>
            </span>
            <span>
              Tên phòng: <span className="font-bold">{el.rRoom?.title}</span>
            </span>
            <span>
              Ngày thuê: <span className="font-bold">{moment(el.createdAt).format("DD/MM/YYYY")}</span>
            </span>
            <span>
              Thời hạn: <span className="font-bold">{moment(el.expiredAt).format("DD/MM/YYYY")}</span>
            </span>
            <span>
              Tình trạng: <span className="font-bold">{el.rRoom?.position}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RentedList
