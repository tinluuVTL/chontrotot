import React, { useEffect, useRef } from "react"
import { useAppStore } from "~/store"

const Modal = ({ children }) => {
  const modalRef = useRef()
  const { setModal } = useAppStore()
  useEffect(() => {
    modalRef.current.scrollIntoView({ inline: "center", block: "center" })
  }, [])
  return (
    <div
      ref={modalRef}
      onClick={() => setModal(false, null)}
      className="fixed h-screen w-screen overflow-hidden z-50 inset-0 bg-overlay-70 flex items-center justify-center"
    >
      {children}
    </div>
  )
}

export default Modal
