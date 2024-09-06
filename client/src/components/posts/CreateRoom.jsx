import React, { useEffect, useState } from "react"
import { InputCheckbox, InputForm, InputSelect } from "../inputs"
import { useForm } from "react-hook-form"
import { Button } from "../commons"
import { useAppStore, useUserStore } from "~/store"
import { apiGetPosts } from "~/apis/post"

const CreateRoom = ({ pushRoom, single }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm()
  const convenients = watch("convenients")
  const { convenientsData, setModal } = useAppStore()
  const { current } = useUserStore()
  const [posts, setPosts] = useState()
  useEffect(() => {
    const fetchPostByManager = async () => {
      const response = await apiGetPosts({ postedBy: current.id, fields: "id,title" })
      if (response.success) setPosts(response.posts)
    }
    fetchPostByManager()
  }, [])
  const onSubmit = (data) => {
    pushRoom(data)
    reset()
  }
  console.log(convenients)
  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="py-4 px-12 bg-white w-full md:w-4/5 lg:w-[700px] rounded-md p-4 max-h-screen overflow-y-auto flex flex-col gap-4"
    >
      {single && (
        <InputSelect
          register={register}
          id="postId"
          errors={errors}
          validate={{ required: "Không được bỏ trống." }}
          title="Bài đăng"
          options={posts?.map((el) => ({ ...el, value: el.id, label: el.title })) || []}
        />
      )}
      <InputForm
        register={register}
        id="title"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Tên phòng"
      />
      <InputForm
        register={register}
        id="price"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Giá thuê / tháng"
        type="number"
      />
      <InputForm
        register={register}
        id="electricPrice"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Giá điện / kWh"
        type="number"
      />
      <InputForm
        register={register}
        id="waterPrice"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Giá nước / mét khối"
        type="number"
      />
      <InputForm
        register={register}
        id="capsPrice"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Giá cáp / tháng"
        type="number"
      />
      <InputForm
        register={register}
        id="internetPrice"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Giá internet / tháng"
        type="number"
      />
      <InputForm
        register={register}
        id="area"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Diện tích"
        type="number"
      />
      <InputForm
        register={register}
        id="stayMax"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Số người ở tối đa"
      />
      <InputCheckbox
        register={register}
        id="convenients"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Tiện nghi"
        options={convenientsData?.map((el) => ({
          ...el,
          label: el.name,
          value: "" + el.id,
          code: "" + el.id,
        }))}
        optionsClassName="grid grid-cols-2 gap-4 mt-3"
        values={convenients || []}
      />
      <div className="flex items-center gap-4 justify-center">
        <Button onClick={handleSubmit(onSubmit)} className="my-4">
          Thêm
        </Button>
        <Button onClick={() => setModal(false, null)} className="my-4 bg-orange-600">
          Quay lại
        </Button>
      </div>
    </form>
  )
}

export default CreateRoom
