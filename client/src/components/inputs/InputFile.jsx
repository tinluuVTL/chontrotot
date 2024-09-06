import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { FaCloudUploadAlt } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { apiUploadImage } from "~/apis/app"
import { CgSpinner } from "react-icons/cg"
import { MdClose } from "react-icons/md"
import { useUserStore } from "~/store"

const InputFile = ({
  containerClassname,
  label,
  id,
  mutilple,
  getImages,
  hidden,
}) => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { isResetImages, resetImages } = useUserStore()
  const {
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm()
  const rawImages = watch(id)
  const uploads = async (files) => {
    const formData = new FormData()
    for (let file of files) {
      formData.append("file", file)
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESETS
      )

      setIsLoading(true)
      const response = await apiUploadImage(formData)
      setIsLoading(false)
      if (response.status === 200)
        setImages((prev) => [
          ...prev,
          { path: response.data.secure_url, id: response.data.public_id },
        ])
    }
  }
  // Khi user chọn ảnh từ máy tính --> tải ảnh lên cloudinary --> lưu array images
  useEffect(() => {
    if (rawImages instanceof FileList && rawImages.length > 0) {
      uploads(rawImages)
    }
  }, [rawImages])
  // Khi images được set giá trị thì gọi hàm để set giá trị cho images ở ngoài
  useEffect(() => {
    if (getImages && images.length > 0) {
      getImages(images)
    }
  }, [images])
  // Reset
  useEffect(() => {
    if (isResetImages) {
      setImages([])
      resetImages(false)
    }
  }, [isResetImages])
  const handleDeleteImage = (e, imageId) => {
    e.preventDefault()
    setImages((prev) => prev.filter((el) => el.id !== imageId))
  }
  return (
    <div
      className={twMerge(
        clsx("flex flex-col gap-2 w-full", containerClassname)
      )}
    >
      {label && <span className="font-medium text-main-700">{label}</span>}
      <input
        multiple={mutilple}
        type="file"
        id={id}
        {...register(id)}
        className="hidden"
      />
      <label
        className="bg-gray-100 w-full p-16 flex items-center flex-col gap-2 justify-center"
        htmlFor={id}
      >
        {isLoading ? (
          <span className="animate-spin">
            <CgSpinner size={20} />
          </span>
        ) : images.length > 0 ? (
          <div
            className={twMerge(
              clsx(
                "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4",
                hidden && "hidden"
              )
            )}
          >
            {images.map((el, idx) => (
              <div key={idx} className="relative col-span-1">
                <img src={el.path} className="w-full object-contain" />
                <span
                  onClick={(e) => handleDeleteImage(e, el.id)}
                  className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-300 bg-gray-100 absolute right-2 top-2"
                >
                  <MdClose size={20} />
                </span>
              </div>
            ))}
          </div>
        ) : (
          <>
            <span className="text-5xl text-gray-300">
              <FaCloudUploadAlt />
            </span>
            <small className="text-grayy-300 italic text-center">
              Only support image with extension JPEG, PNG, JPG.
            </small>
          </>
        )}
      </label>
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  )
}

export default InputFile
