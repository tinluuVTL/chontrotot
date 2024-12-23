import React, { useEffect, useState } from "react";
import { apiGetDashboardAdminManager } from "~/apis/app";
import { LineChart, PieChart, ShowInformation } from "~/components/charts";
import { AiOutlineEye } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { InputForm, InputRadio } from "~/components/inputs";
import { Button } from "~/components/commons";

const DialogStatistics = ({ user, onClose }) => {
    const { register, formState: { errors }, watch, setValue } = useForm();
    const [data, setData] = useState();
    const type = watch("type");
    const from = watch("from");
    const to = watch("to");

    useEffect(() => {
        setValue("type", "DAY");
    }, []);

    useEffect(() => {
        const fetchDashboard = async (params) => {
            const response = await apiGetDashboardAdminManager(params);
            if (response.success) setData(response.data);
        };

        const params = { type };
        if (from) params.from = from;
        if (to) params.to = to;
        params.id = user?.id;
        fetchDashboard(params);
    }, [type, from, to]);

    const handleClose = (e) => {
        if (e.target.id === "overlay") {
            onClose();
        }
    };

    return (
        <div
            id="overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleClose} 
        >
            <div className="bg-white w-full h-full md:w-10/12 lg:w-4/5 md:h-11/12 lg:h-4/5 rounded-lg overflow-y-auto shadow-md p-8"> {/* Tăng kích thước của form */}
                <div className="flex justify-between py-4 border-b">
                    <h1 className="text-4xl font-bold">Thống kê chủ trọ {user?.username}</h1> 
                </div>

                <div className="p-4 grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <ShowInformation className="bg-green-600" text="Tổng lượt xem" number={data?.views[0]?.viewCounter} image={<AiOutlineEye size={40} />} />
                        <ShowInformation className="bg-orange-600" text="Tổng tin đăng" number={data?.post?.reduce((sum, el) => +el.postCounter + sum, 0)} image={<IoNewspaperOutline size={40} />} />
                        <ShowInformation className="bg-blue-600" text="Tổng số phòng" number={data?.roomStatus?.reduce((sum, el) => +el.rRooms?.length + sum, 0)} image={<MdMeetingRoom size={40} />} />
                        <ShowInformation className="bg-yellow-600" text="Tổng thu nhập" number={data?.roomStatus?.reduce((sum, el) => sum + el.rRooms?.reduce((sum1, el1) => sum1 + el1.rPayment?.reduce((sum2, el2) => sum2 + (el2.status === "Thành công" ? el2.total : 0), 0), 0), 0)} image={<TbPigMoney size={40} />} />
                    </div>

                    <div className="grid my-4 grid-cols-1 lg:grid-cols-2 gap-4">
                        <PieChart title="Trạng thái tin đăng" labels={["Khả dụng", "Đã xóa"]} datasets={[{ label: "Số tin đăng", data: [data?.classifyPost?.find((el) => el.isDeleted === false)?.postCounter, data?.classifyPost?.find((el) => el.isDeleted === true)?.postCounter], backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"], borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"], borderWidth: 1 }]} />
                        <PieChart title="Trạng thái phòng" labels={["Đã thuê", "Đang xử lý", "Còn trống"]} datasets={[{ label: "Số phòng", data: [data?.roomStatus?.reduce((sum, el) => sum + el.rRooms?.reduce((sum1, el1) => sum1 + (el1.position === "Đã thuê" ? 1 : 0), 0), 0), data?.roomStatus?.reduce((sum, el) => sum + el.rRooms?.reduce((sum1, el1) => sum1 + (el1.position === "Đang xử lý" ? 1 : 0), 0), 0), data?.roomStatus?.reduce((sum, el) => sum + el.rRooms?.reduce((sum1, el1) => sum1 + (el1.position === "Còn trống" ? 1 : 0), 0), 0)], backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"], borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"], borderWidth: 1 }]} />
                    </div>

                    <div className="col-span-1 w-full border rounded-md bg-white p-4">
                        <h1 className="font-semibold mb-6 text-blue-600 text-lg">Thống kê số tin đã đăng theo {type === "MONTH" ? "tháng" : "ngày"}</h1>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputRadio register={register} id="type" errors={errors} options={[{ label: "Theo tháng", value: "MONTH" }, { label: "Theo ngày", value: "DAY" }]} title="Tùy chọn" optionsClassName="flex items-center gap-4" value={type} />
                            <div className="flex flex-wrap items-center gap-4 col-span-1">
                                <InputForm register={register} id="from" errors={errors} title="Từ" containerClassName="w-fit" type="date" />
                                <InputForm register={register} id="to" errors={errors} title="Đến" containerClassName="w-fit" type="date" />
                                <Button onClick={() => { setValue("to", ""); setValue("from", ""); setValue("type", "DAY"); }} className="-mb-8">Reset</Button>
                            </div>
                        </div>
                        <div className="mt-4 min-h-[300px]">
                            <LineChart customTime={{ from, to }} isMonth={type === "MONTH"} data={data?.postData} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        ❌
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DialogStatistics;
