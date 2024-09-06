import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "~/components/commons"
import { InputForm, InputRadio } from "~/components/inputs"
import { FaGoogle } from "react-icons/fa"
import { useAppStore, useUserStore } from "~/store"
import { IoMdArrowRoundBack } from "react-icons/io"
import { InputOtp } from "~/components/auth"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { auth } from "~/utilities/firebase.config"
import { toast } from "react-toastify"
import { apiLogin, apiRegister, apiValidatePhoneNumber } from "~/apis/user"
import { useNavigate, useSearchParams } from "react-router-dom"
const Login = () => {
  const navigate = useNavigate()
  const [varriant, setVarriant] = useState("LOGIN")
  const [isSendSuccessOtp, setIsSendSuccessOtp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { roles } = useAppStore()
  const { setDataRegister, setToken } = useUserStore()
  const [searchParams] = useSearchParams()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm()
  useEffect(() => {
    reset()
  }, [varriant])
  const roleCode = watch("roleCode")
  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          handleSendOtp()
        },
        "expired-callback": () => {},
      })
    }
  }
  const handleSendOtp = (phone) => {
    setIsLoading(true)
    onCaptchVerify()
    const appVerifier = window.recaptchaVerifier
    const formatPh = "+84" + phone.slice(1)
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult
        setIsLoading(false)
        toast.success("Đã gửi OTP thành công!")
        setIsSendSuccessOtp(true)
      })
      .catch((error) => {
        setIsLoading(false)
        setIsSendSuccessOtp(false)
        if (error.message.includes("reCAPTCHA client element has been removed"))
          toast.info("Vui lòng Reload lại page!")
        else toast.error("Gửi OTP không thành công, hãy thử sĐT khác!")
      })
  }
  const onSubmit = async (data) => {
    if (varriant === "REGISTER") {
      if (data.roleCode === "MANAGER") {
        const validatePhoneNumber = await apiValidatePhoneNumber({
          phone: data.phone,
        })
        if (validatePhoneNumber.success) {
          setDataRegister(data)
          handleSendOtp(data.phone)
        } else toast.error(validatePhoneNumber.mes)
      } else {
        const validatePhoneNumber = await apiValidatePhoneNumber({
          phone: data.phone,
        })
        if (validatePhoneNumber.success) {
          const response = await apiRegister(data)
          if (response.success) {
            toast.success(response.mes)
            setVarriant("LOGIN")
          } else toast.error(response.mes)
        } else toast.error(validatePhoneNumber.mes)
      }
    }
    if (varriant === "LOGIN") {
      const response = await apiLogin(data)
      if (response.success) {
        setToken(response.accessToken)
        if (searchParams.get("from")) navigate(searchParams.get("from"))
        else navigate("/")
      } else toast.error(response.mes)
    }
  }
  const toggleVariant = () => {
    reset()
    if (varriant === "LOGIN") setVarriant("REGISTER")
    else setVarriant("LOGIN")
  }
  return (
    <section className="h-screen w-full relative overflow-hidden">
      <img src="/lg-bg.jpg" alt="backgound-login" className="w-full h-full grayscale object-cover" />
      <div id="recaptcha-container"></div>
      <div className="absolute inset-0 p-4 bg-overlay-50 flex items-center justify-center">
        <div className="bg-white w-full sm:w-3/5 lg:w-[30%] py-4 md:px-8 px-4 rounded-md flex flex-col items-center gap-4">
          <h1 className="font-bold text-2xl mt-3">
            {varriant === "LOGIN" ? "Đăng nhập" : "Đăng ký tài khoản"}
          </h1>
          <form className="w-full flex flex-col pb-12 gap-4">
            <InputForm
              register={register}
              id="phone"
              errors={errors}
              title="Số điện thoại"
              validate={{
                required: "Không được bỏ trống.",
                pattern: {
                  value: /(0[1|3|5|7|8|9])+([0-9]{8})\b/,
                  message: "Số điện thoại không hợp lệ.",
                },
              }}
            />
            <InputForm
              register={register}
              id="password"
              errors={errors}
              title="Mật khẩu"
              type="password"
              validate={{ required: "Không được bỏ trống." }}
            />
            {varriant === "REGISTER" && (
              <InputForm
                register={register}
                id="username"
                errors={errors}
                title="Tên của bạn"
                validate={{ required: "Không được bỏ trống." }}
              />
            )}
            {varriant === "REGISTER" && (
              <InputRadio
                register={register}
                id="roleCode"
                value={roleCode}
                errors={errors}
                title="Vai trò"
                optionsClassName="grid grid-cols-2 gap-4"
                validate={{ required: "Không được bỏ trống." }}
                options={roles
                  ?.filter((el) => el.code !== "ADMIN")
                  ?.map((el) => ({ label: el.value, value: el.code }))}
              />
            )}
            <Button onClick={handleSubmit(onSubmit)} className="w-full mt-4 mb-3" disabled={isLoading}>
              {varriant === "LOGIN" ? "Đăng nhập" : "Đăng ký"}
            </Button>
            {/* {varriant === "LOGIN" && <span className="text-sm text-blue-600">Quên mật khẩu?</span>} */}
            <span className="text-sm flex gap-2 text-blue-600">
              <span>{varriant === "LOGIN" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}</span>
              <span onClick={toggleVariant} className="cursor-pointer hover:underline">
                {varriant === "LOGIN" ? "Đi tới đăng ký mới" : "Đi tới đăng nhập"}
              </span>
            </span>
            {/* <div className="w-full h-[1px] bg-gray-300 text-center relative">
              <span className=" mx-auto inline-block px-2 absolute -top-3 left-0 right-0">
                <span className="bg-white px-2 w-fit text-sm">Hoặc</span>
              </span>
            </div>
            <div className="my-3">
              <Button className="border-red-600 w-full bg-transparent border text-red-600">
                <FaGoogle color="red" />
                <span>Đăng nhập bằng Google</span>
              </Button>
            </div> */}
          </form>
        </div>
      </div>
      {isSendSuccessOtp && (
        <div className="absolute inset-0 bg-white flex items-center justify-center md:bg-overlay-70">
          <div className="bg-white w-full md:h-fit md:w-[500px] rounded-md h-full mx-auto p-6">
            <h1 className="text-xl flex items-center gap-3 font-bold">
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsSendSuccessOtp(false)
                }}
              >
                <IoMdArrowRoundBack size={20} />
              </span>
              Nhập mã OTP
            </h1>
            <div className="mt-8">
              <InputOtp
                setIsSendSuccessOtp={setIsSendSuccessOtp}
                setVarriant={setVarriant}
                reset={reset}
                isRegister={true}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Login
