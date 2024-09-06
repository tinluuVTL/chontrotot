import moment from "moment"
import React from "react"

const DetailUser = ({ user }) => {
  return (
    <div className="w-screen rounded-md bg-white md:w-4/5 lg:w-[700px] flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold mt-4 py-4 px-4">Chi tiết cá nhân</h1>
      <div className="p-6 w-full grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center border-t col-span-1 w-full py-3 gap-2">
          <h3 className="font-bold">Username:</h3>
          <span>{user?.username}</span>
        </div>
        <div className="flex items-center border-t py-3 gap-2">
          <h3 className="font-bold">Số điện thoại:</h3>
          <span>{user?.phone}</span>
        </div>
        <div className="flex items-center border-t py-3 gap-2">
          <h3 className="font-bold">Vai trò:</h3>
          <span>
            {user?.rroles?.map((el) => el.roleValues?.value)?.join(" / ")}
          </span>
        </div>
        <div className="flex items-center border-t py-3 gap-2">
          <h3 className="font-bold">Họ và tên:</h3>
          <span>
            {user?.rprofile
              ? `${user?.rprofile?.firstName} ${user?.rprofile?.lastName}`
              : "Chưa cập nhật"}
          </span>
        </div>
        <div className="flex items-center border-t py-3 gap-2">
          <h3 className="font-bold">Email:</h3>
          <span>
            {user?.rprofile?.email ? user?.rprofile?.email : "Chưa cập nhật"}
          </span>
        </div>
        <div className="flex items-center border-t py-3 gap-2">
          <h3 className="font-bold">Địa chỉ:</h3>
          <span>
            {user?.rprofile?.address
              ? user?.rprofile?.address
              : "Chưa cập nhật"}
          </span>
        </div>
        <div className="flex items-center border-t py-3 gap-2">
          <h3 className="font-bold">CCCD:</h3>
          <span>
            {user?.rprofile?.CID ? user?.rprofile?.CID : "Chưa cập nhật"}
          </span>
        </div>
        <div className="flex items-center border-t py-3 gap-2">
          <h3 className="font-bold">Giới tính:</h3>
          <span>
            {user?.rprofile?.gender ? user?.rprofile?.gender : "Chưa cập nhật"}
          </span>
        </div>
        <div className="flex items-center border-t py-3 gap-2">
          <h3 className="font-bold">Sinh nhật:</h3>
          <span>
            {user?.rprofile?.birthday
              ? moment(user?.rprofile?.birthday).format("DD/MM/YY")
              : "Chưa cập nhật"}
          </span>
        </div>
        <div className="flex border-t py-3 flex-col gap-2">
          <h3 className="font-bold">Ảnh đại diện:</h3>
          <span>
            {user?.rprofile?.image ? (
              <img
                className="w-24 ml-28 h-24 object-cover border rounded-full"
                src={user?.rprofile?.image}
              />
            ) : (
              "Chưa cập nhật"
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DetailUser
