import React, { useEffect, useState } from "react";
import { apiGetDashboardRoom } from "~/apis/app";
import { ShowInformation } from "~/components/charts";
import { TbPigMoney } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { InputForm, InputRadio } from "~/components/inputs";
import { Button } from "~/components/commons";

const DialogStatisticsRoom = ({ room, onClose }) => {
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
            const response = await apiGetDashboardRoom(params);
            if (response.success) setData(response.data);
        };
        const params = { type };
        if (from) params.from = from;
        if (to) params.to = to;
        params.idUser = room?.rPost?.postedBy;
        params.idRoom = room?.id;
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
                    <h1 className="text-4xl font-bold">Thống kê phòng {room?.title}</h1> 
                </div>

                <div className="p-4 grid grid-cols-1 gap-4">
                    <div className="col-span-1 w-full border rounded-md bg-white p-4">
                        <h1 className="font-semibold mb-6 text-blue-600 text-lg">Thống kê doanh thu theo {type === "MONTH" ? "tháng" : "ngày"}</h1>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputRadio register={register} id="type" errors={errors} options={[{ label: "Theo tháng", value: "MONTH" }, { label: "Theo ngày", value: "DAY" }]} title="Tùy chọn" optionsClassName="flex items-center gap-4" value={type} />
                            <div className="flex flex-wrap items-center gap-4 col-span-1">
                                <InputForm register={register} id="from" errors={errors} title="Từ" containerClassName="w-fit" type="date" />
                                <InputForm register={register} id="to" errors={errors} title="Đến" containerClassName="w-fit" type="date" />
                                <Button onClick={() => { setValue("to", ""); setValue("from", ""); setValue("type", "DAY"); }} className="-mb-8">Reset</Button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center my-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 w-full max-w-md">
                                <ShowInformation
                                    className="bg-yellow-600 p-8 rounded-lg text-center"
                                    text="Tổng thu nhập"
                                    number={data?.roomStatus?.reduce((sum, el) =>
                                        sum + el.rRooms?.reduce((sum1, el1) =>
                                            sum1 + el1.rPayment?.reduce((sum2, el2) =>
                                                sum2 + (el2.status === "Thành công" ? el2.total : 0), 0
                                            ), 0
                                        ), 0)}
                                    image={<TbPigMoney size={150} />}
                                />
                            </div>
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

export default DialogStatisticsRoom;
