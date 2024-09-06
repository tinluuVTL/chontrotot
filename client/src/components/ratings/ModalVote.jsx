import { AiFillStar } from "react-icons/ai"
import { useState } from "react"
import { toast } from "react-toastify"
import { useAppStore } from "~/store"
import { Button } from "../commons"
import { apiRatings } from "~/apis/post"

const votes = [
  { txt: "🤬", star: 1 },
  { txt: "😡", star: 2 },
  { txt: "🙂", star: 3 },
  { txt: "😊", star: 4 },
  { txt: "🤩", star: 5 },
]
const ModalVote = ({ pid }) => {
  const { setModal } = useAppStore()
  const [payload, setPayload] = useState({
    content: "",
    score: null,
  })
  const handleSubmit = async () => {
    const response = await apiRatings(pid, payload)
    if (response.success) {
      toast.success(response.message)
      setPayload({
        content: "",
        score: null,
      })
    } else toast.info(response.message)
    setModal(false, null)
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-8 bg-white rounded-md w-[95%] md:w-4/5 lg:w-[500px]"
    >
      <div className="flex flex-col gap-4 mt-2">
        <span className="font-bold">Bạn thấy tin đăng này như thế nào</span>
        <div className="w-full flex justify-between items-center">
          {votes.map((item, index) => (
            <span
              key={index}
              className="flex flex-col flex-1 py-4 gap-2 justify-center rounded-lg cursor-pointer items-center hover:bg-gray-200"
              onClick={() =>
                setPayload((prev) => ({ ...prev, score: item.star }))
              }
            >
              {payload.score < index + 1 ? (
                <AiFillStar size={18} />
              ) : (
                <AiFillStar size={18} color="#f59e0b" />
              )}
              <span className="text-3xl">{item.txt}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full gap-2">
        <textarea
          className="form-textarea rounded-md placeholder:text-gray-500 border-gray-200"
          cols="30"
          rows="5"
          id="content"
          placeholder="Thêm nhận xét"
          value={payload.content}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, content: e.target.value }))
          }
        ></textarea>
      </div>
      <Button className="mt-6 mx-auto" onClick={handleSubmit}>
        Gửi đánh giá
      </Button>
    </div>
  )
}

export default ModalVote
