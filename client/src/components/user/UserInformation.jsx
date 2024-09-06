import React, { useState } from "react"
import Swal from "sweetalert2"
import { useAppStore, useUserStore } from "~/store"
import { InputOtp } from "../auth"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { auth } from "~/utilities/firebase.config"
import { toast } from "react-toastify"
import { CgSpinner } from "react-icons/cg"
import { apiUpgradeToManager } from "~/apis/user"
import { useNavigate } from "react-router-dom"
import pathname from "~/utilities/path"

const UserInformation = () => {
  const { current } = useUserStore()
  const { setModal } = useAppStore()
  const navigate = useNavigate()
  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            handleSendOtp()
          },
          "expired-callback": () => {},
        }
      )
    }
  }
  const Loading = () => {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="animate-spin text-white">
          <CgSpinner />
        </span>
      </div>
    )
  }
  const handleUpgradeToManager = async () => {
    const response = await apiUpgradeToManager()
    if (response.success) {
      toast.success(response.mes)
      navigate(`/${pathname.public.LOGIN}`)
    } else toast.error(response.mes)
    setModal(false, null)
  }
  const handleSendOtp = () => {
    setModal(true, <Loading />)
    onCaptchVerify()
    const appVerifier = window.recaptchaVerifier
    const formatPh = "+84" + current?.phone?.slice(1)
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult
        setModal(true, <InputOtp cb={handleUpgradeToManager} />)
        toast.success("Đã gửi OTP thành công!")
      })
      .catch((error) => {
        setModal(false, null)
        if (error.message.includes("reCAPTCHA client element has been removed"))
          toast.info("Vui lòng Reload lại page!")
        else toast.error("Gửi OTP không thành công, hãy thử sĐT khác!")
      })
  }
  const handleUpgradeRoleManager = () => {
    Swal.fire({
      icon: "info",
      title: "Thông báo",
      text: "Để nâng cấp tài khoản thành chủ trọ, bạn phải xác minh SĐT của mình. Hãy cập nhật SĐT chính xác trước khi nâng cấp.",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Xác minh",
      cancelButtonText: "Quay lại",
    }).then((rs) => {
      if (rs.isConfirmed) {
        handleSendOtp()
      }
    })
  }
  return (
    <div className="p-4 my-4 flex flex-col justify-center items-center">
      <img
        src={current?.rprofile?.image || "/user.svg"}
        alt="user"
        className="w-24 h-24 object-cover rounded-full"
      />
      <h3 className="font-bold text-lg">{current?.username}</h3>
      <small>
        ID: <span className="font-semibold">#{current?.id}</span>
      </small>
      <small>
        {current?.rroles?.map((el) => el.roleValues?.value)?.join(" / ")}
      </small>
      {!current?.rroles?.some((el) => el.roleCode === "MANAGER") && (
        <span
          onClick={handleUpgradeRoleManager}
          className="text-sm text-orange-300 hover:underline cursor-pointer"
        >
          Nâng cấp tài khoản chủ trọ
        </span>
      )}
      <div id="recaptcha-container"></div>
    </div>
  )
}

export default UserInformation
