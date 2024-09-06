import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye } from "react-icons/ai"
import { IoNewspaperOutline } from "react-icons/io5"
import { TbPigMoney } from "react-icons/tb"
import { apiGetDashboardAdmin } from "~/apis/app"
import { LineChart, PieChart, ShowInformation } from "~/components/charts"
import { MdOutlineGroups } from "react-icons/md"
import { InputForm, InputRadio } from "~/components/inputs"
import { Button } from "~/components/commons"

const AdminDashboard = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm()
  const [data, setdata] = useState()
  const type = watch("type")
  const from = watch("from")
  const to = watch("to")
  useEffect(() => {
    setValue("type", "DAY")
  }, [])
  useEffect(() => {
    const fetchDashboard = async (params) => {
      const response = await apiGetDashboardAdmin(params)
      if (response.success) setdata(response.data)
    }
    const params = { type }
    if (from) params.from = from
    if (to) params.to = to
    fetchDashboard(params)
  }, [type, from, to])
  return (
    <div className="w-full h-full">
      <div className="flex justify-between py-4 lg:border-b px-4 items-center">
        <h1 className="text-3xl font-bold">Thống kê</h1>
      </div>
      <div className="p-4 grid grid-cols-1 gap-4">
        <div className="grid col-span-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ShowInformation
            className="bg-green-600"
            text="Tổng lượt xem trọ"
            number={data?.views[0]?.viewCounter}
            image={<AiOutlineEye size={40} />}
          />
          <ShowInformation
            className="bg-orange-600"
            text="Tổng tin đăng mới"
            number={data?.postData?.reduce((sum, el) => +el.postCounter + sum, 0)}
            image={<IoNewspaperOutline size={40} />}
          />
          <ShowInformation
            className="bg-blue-600"
            text="Tổng thu nhập"
            number={data?.paymentStatus?.reduce((sum, el) => +el.total + sum, 0)}
            image={<TbPigMoney size={40} />}
          />
          <ShowInformation
            className="bg-yellow-600"
            text="Tổng thành viên mới"
            number={data?.userCount[0]?.userCounter}
            image={<MdOutlineGroups size={40} />}
          />
        </div>
        <div className="grid my-4 grid-cols-1 lg:grid-cols-2 gap-4">
          <PieChart
            title="Trạng thái thu nhập"
            labels={["Thành công", "Đang xử lý", "Đã hủy"]}
            datasets={[
              {
                label: "Tổng thu nhập",
                data: [
                  data?.paymentStatus?.find((el) => el.status === "Thành công")?.total || 0,
                  data?.paymentStatus?.find((el) => el.status === "Đang chờ")?.total || 0,
                  data?.paymentStatus?.find((el) => el.status === "Đã hủy")?.total || 0,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                borderWidth: 1,
              },
            ]}
          />
          <PieChart
            title="Phân loại thành viên"
            labels={["Admin", "Chủ trọ", "Thành viên"]}
            datasets={[
              {
                label: "Số lượng",
                data: [
                  data?.userRoles?.find((el) => el.roleCode === "ADMIN")?.count || 0,
                  data?.userRoles?.find((el) => el.roleCode === "MANAGER")?.count || 0,
                  data?.userRoles?.find((el) => el.roleCode === "USER")?.count || 0,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                borderWidth: 1,
              },
            ]}
          />
        </div>
        <div className="col-span-1 w-full border rounded-md bg-white p-4">
          <h1 className="font-semibold mb-6 text-blue-600 text-lg">
            Thống kê số tin đã đăng theo <span>{type === "MONTH" ? "tháng" : "ngày"}</span>
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputRadio
              register={register}
              id="type"
              errors={errors}
              options={[
                { label: "Theo tháng", value: "MONTH" },
                { label: "Theo ngày", value: "DAY" },
              ]}
              title="Tùy chọn"
              optionsClassName="flex items-center gap-4"
              value={type}
            />
            <div className="flex flex-wrap items-center gap-4 col-span-1">
              <InputForm
                register={register}
                id="from"
                errors={errors}
                title="Từ"
                containerClassName="w-fit"
                type="date"
              />
              <InputForm
                register={register}
                id="to"
                errors={errors}
                title="đến"
                containerClassName="w-fit"
                type="date"
              />
              <Button
                onClick={() => {
                  setValue("to", "")
                  setValue("from", "")
                  setValue("type", "DAY")
                }}
                className="-mb-8"
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="mt-4 min-h-[300px]">
            <LineChart customTime={{ from, to }} isMonth={type === "MONTH"} data={data?.postData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
