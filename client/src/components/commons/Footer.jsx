import React from "react"
import { Link } from "react-router-dom"
import { useAppStore } from "~/store"
import pathname from "~/utilities/path"

const Footer = () => {
  const { catalogs } = useAppStore()
  return (
    <div className="w-full bg-blue-600 text-white">
      <div className="w-full lg:w-main p-4 py-12 mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="mb-4 flex items-center justify-center">
          <img src="/logow.png" alt="Logo" className="h-[48px] object-contain" />
        </div>
        
        {/* Dòng chữ mô tả */}
        <div className="text-center mb-6 px-4">
          <span>
          Chúng tôi là một đội ngũ đầy kinh nghiệm, cùng phát triển những sản phẩm phần mềm chất lượng cao giúp các chủ trọ, người thuê trọ tối ưu hóa hoạt động và thành công khi quản lý và tìm kiếm nhà trọ. Với Chọn Trọ Tốt chúng tôi cam kết mang đến cho khách hàng những giải pháp tốt nhất về nhà trọ.
          </span>
        </div>

        {/* Các mục Hệ thống, Về chúng tôi, Liên hệ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm w-full">
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="font-bold text-center md:text-left">HỆ THỐNG</h2>
            <div className="flex flex-col items-center md:items-start gap-2">
              {catalogs?.map((el) => (
                <Link key={el.id} to={el.slug} className="hover:underline">
                  {el.value}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="font-bold text-center md:text-left">VỀ CHÚNG TÔI</h2>
            <div className="flex flex-col items-center md:items-start gap-2">
            <span>
                Câu Lạc Bộ Lập Trình - Khoa Công nghệ Thông Tin - Đại Học Lạc Hồng
              </span>
              <span>
                Số điện thoại: <a href="tel:0911132826" className="hover:underline">0911132826</a>
              </span>
              <span>
                Email: <a href="mailto:phuc@lhu.edu.vn" className="hover:underline">phuc@lhu.edu.vn</a>
              </span>
              <span>
                Địa chỉ: <span>Phòng B301, Số 10 Huỳnh Văn Nghệ, Bửu Long, TP Biên Hòa, Đồng Nai</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="font-bold text-center md:text-left">LIÊN HỆ VỚI CHÚNG TÔI</h2>
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link to={`/${pathname.public.LIENHE}`} className="hover:underline">
                Giới thiệu & Liên Hệ
              </Link>
              <span>
                Số điện thoại: <a href="tel:0971784954" className="hover:underline">0971784954</a>
              </span>
              <span>
                Email: <a href="mailto:chontrotot.io.vn@gmail.com" className="hover:underline">chontrotot.io.vn@gmail.com</a>
              </span>
              
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4">
        <span>2024 CTT © Copyright 2022-2024. All Rights Reserved.</span>
      </div>
    </div>
  )
}

export default Footer