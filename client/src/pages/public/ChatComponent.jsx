import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/commons";
import { InputForm } from "~/components/inputs";
import { FiSend } from "react-icons/fi";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineMessage } from "react-icons/ai"; // Chat icon
import { CiPhone } from "react-icons/ci"; // Phone icon
import ZaloIcon from "../../../public/img/zalo_icon.png"; // Zalo icon

const ChatComponent = () => {
  const form = useRef();
  const [showChat, setShowChat] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendEmail = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://be-portfolio-n6ii.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (response.ok) {
        reset();
        setShowSuccess(true);
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeMessage = () => {
    setShowSuccess(false);
  };

  return (
    <div>
      {/* Chat Button with Icon */}
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg transition duration-200 hover:bg-blue-500"
        onClick={() => setShowChat(!showChat)}
      >
        <AiOutlineMessage size={24} />
      </button>

      {/* Chat Form */}
      {showChat && (
        <div className="fixed bottom-16 right-4 bg-white border rounded-lg shadow-lg p-4 w-full sm:w-80 z-50 max-w-xs">
          {/* Image at the top of the chat form */}
          <img
            src="/img/contact.jpg"
            alt="Chat Icon"
            className="w-full h-auto mb-2 rounded"
          />
          <h2 className="text-2xl font-semibold">Liên Hệ chúng tôi:</h2>
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={() => setShowChat(false)}
          >
            ❌
          </button>
          <form
            className="contact__form space-y-4 mt-4"
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

            {/* Phone and Zalo Buttons */}
            <h4 className="text-center font-semibold">-----Hoặc-----</h4>
            <div className="flex justify-between mt-4">
              <a
                href={`tel:0971784954`}
                className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition duration-200"
              >
                <CiPhone size={20} />
                Gọi
              </a>
              <a
                href={`https://zalo.me/0971784954`}
                className="flex items-center gap-2 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition duration-200"
              >
                <img src={ZaloIcon} alt="Zalo" className="w-5 h-5" />
                Zalo
              </a>
            </div>
          </form>

          {/* Success Message Modal */}
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
      )}
    </div>
  );
};

export default ChatComponent;
