import React, { useState } from "react"
import OtpInput from "react-otp-input"
import { GoDotFill } from "react-icons/go"
import { Button } from "../commons"
import { useUserStore } from "~/store"
import { apiRegister } from "~/apis/user"
import { toast } from "react-toastify"
const InputOtp = ({
  setIsSendSuccessOtp,
  setVarriant,
  reset,
  cb,
  isRegister,
}) => {
  const [otpNumber, setOtpNumber] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { dataRegister } = useUserStore()

  const handleSubmitOtp = () => {
    setIsLoading(true)
    window.confirmationResult
      .confirm(otpNumber)
      .then(async (res) => {
        setIsLoading(false)
        if (isRegister) {
          const response = await apiRegister(dataRegister)
          if (response.success) {
            toast.success(response.mes)
            setVarriant && setVarriant("LOGIN")
            reset && reset()
          } else toast.error(response.mes)
        }
        cb && cb()

        setIsSendSuccessOtp && setIsSendSuccessOtp(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex bg-white p-4 rounded-md flex-col gap-4"
    >
      <span>
        Chúng tôi đã gửi mã OTP về số điện thoại{" "}
        <span className="font-semibold">{dataRegister?.phone}</span>. Vui lòng
        kiểm tra điện thoại của bạn.
      </span>
      <OtpInput
        containerStyle="mx-auto my-6"
        value={otpNumber}
        onChange={setOtpNumber}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
        inputStyle="h-12 md:h-16 border rounded-md outline-none inline-block otp-item border-blue-500 text-lg mx-1"
        renderSeparator={
          <span className="">
            <GoDotFill />
          </span>
        }
        shouldAutoFocus={true}
      />
      <div className="flex items-center justify-center gap-4">
        <Button disabled={isLoading} onClick={handleSubmitOtp}>
          Gửi OTP
        </Button>
        <Button className="bg-orange-600" onClick={() => setOtpNumber("")}>
          Clear
        </Button>
      </div>
    </div>
  )
}

export default InputOtp
