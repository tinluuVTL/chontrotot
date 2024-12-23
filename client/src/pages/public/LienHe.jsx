import React, { useEffect, useRef, useState } from "react";
import { Button } from "~/components/commons";
import { InputForm } from "~/components/inputs";
import AOS from "aos"; // Ensure AOS is installed
import { FcCheckmark } from "react-icons/fc";
import { FiSend } from "react-icons/fi";
import { useForm } from "react-hook-form";

const Contact = () => {
  const form = useRef();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const sendEmail = async (data) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        "https://be-portfolio-n6ii.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (response.ok) {
        reset(); // Reset form on success
        setShowSuccess(true);
        console.log(result.message);
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const closeMessage = () => {
    setShowSuccess(false);
  };

  return (
    <div className="w-full px-4 my-6 lg:w-main mx-auto">
      <h2 className="text-3xl font-semibold">Giới thiệu về web</h2>

      {/* Phần giới thiệu */}
      <div className="mt-4 text-lg">
        <p>
          - Với mong muốn xây dựng một trang web thật PRO chuyên cung cấp thông
          tin nhà trọ phòng trọ cho mọi người, khi mà ngày nay nhu cầu nhà trọ
          phòng trọ ngày càng tăng ở các thành phố lớn và cả nước.
        </p>
        <p>
          Đối với cách tiếp cận thông tin truyền thống đã không được truyền đến
          mọi người một cách kịp thời đúng lúc.
        </p>
        <p>
          Chính vì nắm bắt được tình hình thực tế đó mà chúng tôi đã thành lập
          website <strong>Chontrotot.io.vn</strong> với mong muốn trở thành một
          kênh truyền thông phổ biến nhà trọ, phòng trọ hữu ích cho mọi người.
        </p>
        <p>
          Nếu trước đây việc cho thuê nhà, cho thuê phòng trọ đều dán giấy đăng
          quảng cáo ở các nơi công cộng rất là mất vẽ mỹ quang đô thị. Thì ngày
          nay các bạn có thể đăng tin trên đây rất tiện lợi, với phương tiện
          truyền thông được phổ biến rộng rãi tin đăng của bạn sẽ được hàng ngàn
          người biết đến.
        </p>
        <p>
          Website ra đời sẽ góp phần giải quyết được các vấn đề thuê trọ hiện
          nay, và giúp mọi người tìm kiếm nhà trọ, chỗ ở phù hợp và dễ dàng. Hệ
          Thống quản lý nhà trọ giúp trọ tiện nghi trong việc quản lý nhà trọ
          hơn.
        </p>
        <p>
          Hy vọng <strong>Chontrotot.io.vn</strong> sẽ là địa chỉ quen thuộc cho
          mọi người.
        </p>{" "}
        <p>
          Website với giao diện thân thiện dễ sử dụng và hướng đến người dùng,
          các chuyên mục được phân chia rất rõ ràng và tìm kiếm tin đăng rất chi
          tiết.
        </p>
        <ul className="list-disc ml-5 mt-2">
          <li>
            Bạn có thể tìm phòng trọ nhà trọ, tìm người ở ghép, tìm nhà cho thuê
            theo:
          </li>
          <ul className="list-disc ml-5">
            <li>+ Tỉnh thành như Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng...</li>
            <li>+ Tìm kiếm theo giá, theo diện tích.</li>
            <li>+ Đánh giá bà viết, chuyên mục.</li>
          </ul>
          <li>
            Chủ trọ có thể quản lý phòng trọ , khách thuê nhà trọ, tìm người ở
            ghép :
          </li>
          <ul className="list-disc ml-5">
            <li>+ Thống kê nhà trọ.</li>
            <li>+ Tính tiền điện nước, khách thuê trọ.</li>
            <li>+ Đăng tải hình ảnh nhà trọ lên web.</li>
          </ul>
          <li>
            Đăng tin cho thuê phòng trọ, nhà trọ, nhà nguyên căn, cho thuê căn
            hộ chung cư với đầy đủ tính năng:
          </li>
          <ul className="list-disc ml-5">
            <li>+ Chức năng quản lý bài viết cho mỗi thành viên</li>
            <li>+ Chức năng đăng tin lên top cho người đăng tin</li>
            <li>
              + Chức năng xóa, sửa, hạ tin đăng nhưng vẫn còn lưu trên hệ thống
              vv...
            </li>
          </ul>
        </ul>
        <p className="mt-4">
          Chúng tôi luôn cố gắng đem lại những thông tin nhanh chóng và chính
          xác cho mọi người. Rất mong nhận được sự ủng hộ giúp đỡ của mọi người
          cùng nhau xây dựng một kênh thông tin truyền thông về nhà trọ.
        </p>
        <div className="mt-12">
          <h2 className="text-xl font-semibold">Hỗ trợ chủ nhà đăng tin</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
  <div className="p-4 border rounded-lg shadow-md flex flex-col items-center">
    <a href="https://zalo.me/0971784954" target="_blank" rel="noopener noreferrer">
      <img
        src="/img/Logo-Zalo-Arc.webp"
        alt="Zalo"
        className="w-16 h-16 mb-2 rounded-full border border-gray-300"
      />
    </a>
    <h3 className="font-semibold text-center">Liên hệ Zalo</h3>
    <p className="text-center">
      Liên hệ với tư vấn viên của chúng tôi qua Zalo
    </p>
  </div>
  
  <div className="p-4 border rounded-lg shadow-md flex flex-col items-center">
    <a href="https://www.facebook.com/vantin.luu.98" target="_blank" rel="noopener noreferrer">
      <img
        src="/img/Facebook_Logo.png"
        alt="Facebook"
        className="w-16 h-16 mb-2 rounded-full border border-gray-300"
      />
    </a>
    <h3 className="font-semibold text-center">Liên hệ Facebook</h3>
    <p className="text-center">
      Liên hệ với nhân viên qua Facebook
    </p>
  </div>
  
  <div className="p-4 border rounded-lg shadow-md flex flex-col items-center">
    <a href="tel:0971784954">
      <img
        src="/img/phone.png"
        alt="Gọi điện thoại"
        className="w-16 h-16 mb-2 rounded-full border border-gray-300"
      />
    </a>
    <h3 className="font-semibold text-center">Gọi điện thoại</h3>
    <p className="text-center">
      Liên hệ với nhân viên qua số điện thoại: 
      <a 
        href="tel:0971784954" 
        className="text-blue-600 underline"
      >
        0971.784.954
      </a>
    </p>
  </div>
</div>
        </div>
        <h3 className="mt-6 text-xl font-semibold">Thông tin về website:</h3>
        <ul className="list-disc ml-5 mt-2">
          <li>
            Website <strong>Chontrotot.io.vn</strong> trực thuộc Câu Lạc Bộ Lập
            Trình - Khoa Công nghệ Thông Tin - Đại Học Lạc Hồng
          </li>
          <li>
            Website:{" "}
            <a href="http://chontrotot.io.vn/" className="text-blue-600">
            http://chontrotot.io.vn/
            </a>
          </li>
          <li>
            Địa chỉ: Phòng B301, Số 10 Huỳnh Văn Nghệ, Bửu Long, TP Biên Hòa,
            Đồng Nai.
          </li>
          <li>Số điện thoại: 0911132826</li>
          <li>
            Email:{" "}
            <a
              href="mailto:chontrotot.io.vn@gmail.com"
              className="text-blue-600"
            >
              chontrotot.io.vn@gmail.com
            </a>
          </li>
        </ul>
        <p className="mt-4 font-semibold">
          Kênh thông tin phòng trọ số 1 Việt Nam.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Các dịch vụ chính:</h2>
        <p className="mt-6 text-center">
          Chúng tôi có những dịch vụ sau chuyên cung cấp cho các bạn một môi
          trường tìm kiếm thông tin trọ uy tín nhất hiện nay. Cho phép chủ trọ
          quản lý trọ của mình một cách tiện ích nhất.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="flex flex-col items-center p-4 border rounded-lg shadow-md">
            <img
              src="/img/banner1.webp"
              alt="Dịch vụ 1"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <p>Đăng thông tin quảng cáo cho thuê phòng trọ</p>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-lg shadow-md">
            <img
              src="/img/banner2.jpg"
              alt="Dịch vụ 2"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <p> Quản lý nhà trọ.</p>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-lg shadow-md">
            <img
              src="/img/banner3.jpg"
              alt="Dịch vụ 3"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <p>Tìm kiếm nhà trọ.</p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h2 className="text-2xl font-semibold">Liên Hệ chúng tôi:</h2>
      <div className="mt-4 flex flex-col md:flex-row" data-aos="fade-up">
        {/* Hình ảnh bên trái */}
        <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
          <img
            src="/img/contact.jpg"
            alt="Liên hệ"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Form liên hệ bên phải */}
        <div className="md:w-1/2 md:pl-6">
          <form
            className="contact__form space-y-4"
            ref={form}
            onSubmit={handleSubmit(sendEmail)}
          >
            <InputForm
              required
              id="name"
              register={register}
              errors={errors}
              placeholder="Tên của bạn"
              className="form__control p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <InputForm
              required
              type="email"
              id="email"
              register={register}
              errors={errors}
              placeholder="Email của bạn"
              className="form__control p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <InputForm
              required
              id="phone"
              register={register}
              errors={errors}
              placeholder="Số điện thoại của bạn"
              className="form__control p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <InputForm
              required
              textarea
              id="message"
              register={register}
              errors={errors}
              placeholder="Nội dung tin nhắn"
              className="form__control p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <div className="flex justify-center">
              {loading ? (
                <Button
                  type="button"
                  className="bg-blue-600 text-white border-none mt-4 px-6 py-2 rounded-lg transition duration-200"
                  disabled
                >
                  Đang gửi...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-blue-600 text-white border-none mt-4 px-6 py-2 rounded-lg transition duration-200 hover:bg-blue-500"
                >
                  Gửi
                  <FiSend className="contact__button-icon ml-2" />
                </Button>
              )}
            </div>
          </form>
          {/* Modal thông báo thành công */}
          {showSuccess && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <div className="flex justify-center mb-4">
                  <FcCheckmark className="text-green-500" size={60} />
                </div>
                <p className="text-center text-lg">
                  Tin nhắn của bạn đã được gửi thành công!
                  <span className="block mt-2">
                    Tôi sẽ liên hệ lại với bạn sớm 😊
                  </span>
                </p>
                <div className="flex justify-center mt-4">
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() => {
                      closeMessage();
                      reset();
                    }}
                  >
                   ❌
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hỗ trợ chủ nhà đăng tin */}

      {/* Các dịch vụ chính */}
    </div>
  );
};

export default Contact;
