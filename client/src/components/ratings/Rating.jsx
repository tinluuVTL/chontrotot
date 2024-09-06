import Swal from "sweetalert2"
import { useAppStore, useUserStore } from "~/store"
import { renderStar } from "~/utilities/fn"
import Votebar from "./Votebar"
import ModalVote from "./ModalVote"
import pathname from "~/utilities/path"
import { Button } from "../commons"
import { useNavigate } from "react-router-dom"
import moment from "moment"

const Rating = ({ title, pid, averageStarPoint, detail = [] }) => {
  const navigate = useNavigate()
  const { current } = useUserStore()
  const { setModal } = useAppStore()
  return (
    <div className="relative border rounded-md mt-6 bg-white p-4">
      <h3 className="text-base font-bold">{`Đánh giá & nhận xét ${title}`}</h3>
      <div className="flex border rounded-md mt-8">
        <div className="flex-auto w-2/5 border-r flex flex-col gap-1 items-center justify-center">
          <span className="text-[24px] font-bold">{`${
            Math.round(averageStarPoint * 10) / 10
          }/5`}</span>
          <span className="flex items-center">
            {renderStar(averageStarPoint)?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </span>
          <span className="text-xs md:text-sm text-center text-gray-600">{`${detail.length} lượt đánh giá và nhận xét`}</span>
        </div>
        <div className="flex-auto w-3/5 p-[10px]">
          {[...Array(5).keys()].map((item) => (
            <Votebar
              key={item}
              star={5 - item}
              voter={detail.filter((el) => +el.score === 5 - item).length}
              percent={Math.round(
                (detail?.filter((i) => +i.score === 5 - item)?.length * 100) /
                  detail?.length
              )}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center text-main-500 gap-2 flex-col mt-4">
        <span>Bạn đánh giá sao tin đăng này</span>
        <Button
          onClick={() => {
            if (
              current &&
              current?.rroles?.some((el) => el.roleCode === "USER")
            ) {
              setModal(true, <ModalVote pid={pid} />)
            } else {
              Swal.fire(
                "Oops!",
                "Hãy đăng nhập tài khoản tìm kiếm để đánh giá~",
                "info"
              ).then(() => {
                navigate(`/${pathname.public.LOGIN}`)
              })
            }
          }}
        >
          Đánh giá ngay
        </Button>
      </div>
      {detail?.map((item) => (
        <div key={item.id} className="flex gap-2 flex-col mt-4">
          <div className="flex gap-2">
            <span className="font-bold">{item?.rVoter?.username}</span>
            <span className="text-sm text-gray-600">{`(${moment(
              item.createdAt
            ).format("DD/MM/YYYY")})`}</span>
          </div>
          <div className="ml-[28px] p-4 gap-2 flex flex-col bg-gray-100 rounded-md text-sm">
            <span className="font-semibold flex gap-2">
              <span>Đánh giá: </span>
              <span className="flex items-center">
                {renderStar(item.score)?.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </span>
            </span>
            <span className="font-semibold flex gap-2">
              <span>Nhận xét:</span>
              <span>{item.content || "Chưa có nhận xét"}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Rating
