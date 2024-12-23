import Carousel from "nuka-carousel"
import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { apiGetPostById, apiGetPosts } from "~/apis/post"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"
import { formatMoney, renderStar } from "~/utilities/fn"
import moment from "moment"
import DOMPurify from "dompurify"
import { CiPhone } from "react-icons/ci"
import { Map } from "~/components/maps"
import { RelatedCard, RelatedPosts } from "~/components/posts"
import { RoomCard } from "~/components/rooms"
import { Rating } from "~/components/ratings"
import { useAppStore } from "~/store"

const DetailNew = () => {
  const { pid } = useParams()
  const [post, setPost] = useState()
  const [newPosts, setNewPosts] = useState()
  const [relatedPost, setRelatedPost] = useState()
  const titleRef = useRef()
  const { isShowModal } = useAppStore()
  const fetchPostDetail = async () => {
    const response = await apiGetPostById(pid)
    if (response.success) setPost(response.post)
  }
  const fetchNewPosts = async () => {
    const response = await apiGetPosts({ limit: 5, sort: "-createdAt" })
    if (response.success) setNewPosts(response.posts.rows)
  }
  const fetchPostsByCatalog = async (catalogId) => {
    const response = await apiGetPosts({ limit: 5, catalogId })
    if (response.success) setRelatedPost(response.posts.rows)
  }
  useEffect(() => {
    !isShowModal && fetchPostDetail()
    fetchNewPosts()
    // titleRef.current.scrollIntoView({ block: "center" })
  }, [pid, isShowModal])
  useEffect(() => {
    if (post && post?.catalogId) {
      fetchPostsByCatalog(post?.catalogId)
    }
  }, [post])
  return (
    <div className="w-full p-4 lg:w-main mx-auto grid grid-cols-7 lg:grid-cols-10 gap-4">
      <div className="col-span-7 my-4 flex flex-col gap-4">
        <div className="bg-black w-full">
          <Carousel
            className="w-full mx-auto"
            slidesToShow={1}
            slidesToScroll={1}
            renderCenterLeftControls={({ previousSlide, previousDisabled }) => (
              <button
                className={twMerge(
                  clsx(
                    "p-2 bg-gray-700 border -ml-4 shadow-md text-white rounded-full",
                    previousDisabled && "cursor-default opacity-20"
                  )
                )}
                onClick={previousSlide}
              >
                <FiChevronLeft size={20} />
              </button>
            )}
            renderCenterRightControls={({ nextSlide, nextDisabled }) => (
              <button
                className={twMerge(
                  clsx(
                    "p-2 bg-gray-700 shadow-md text-white -mr-4  border rounded-full",
                    nextDisabled && "cursor-default opacity-20"
                  )
                )}
                onClick={nextSlide}
              >
                <FiChevronRight size={20} />
              </button>
            )}
            wrapAround={false}
          >
            {post?.images?.map((el, idx) => (
              <img src={el} key={idx} className="h-[200px] lg:h-[300px] object-contain  mx-auto" />
            ))}
          </Carousel>
        </div>
        <h1 ref={titleRef} className="text-blue-600 font-semibold text-xl">
          <span className="flex items-center">
            {renderStar(post?.star)?.map((el, idx) => (
              <span key={idx}>{el}</span>
            ))}
          </span>{" "}
          {post?.title}
        </h1>
        <div className="flex flex-col gap-2">
          <span>
            Thể loại:{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              {post?.rCatalog?.value}
            </span>
          </span>
        
          <span>
            Này cập nhật gần nhất: <span>{moment(post?.updatedAt).format("DD/MM/YYYY")}</span>
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.description),
          }}
        />
      
        
        <div>
          <Rating title={post?.title} pid={post?.id} averageStarPoint={post?.star} detail={post?.rRating} />
        </div>
      </div>
      <div className="col-span-7 flex flex-col gap-4 lg:col-span-3">
        <div className="p-4 my-4 w-full h-fit border-blue-600 border rounded-md flex flex-col justify-center items-center">
          <img
            src={post?.rUser?.rprofile?.image || "/user.svg"}
            alt="user"
            className="w-24 h-24 object-cover rounded-full"
          />
          <h3 className="font-bold text-lg">{post?.rUser?.username}</h3>
          <small className="text-base">
            ID: <span className="font-semibold">#{post?.rUser?.id}</span>
          </small>
          <a
             onClick={() => {
              window.location.href = `tel:${post?.rUser?.phone}`;
            }}
            className="flex my-4 gap-2 items-center font-bold justify-center py-2 w-full rounded-md bg-green-600 text-white"
          >
            <CiPhone size={20} /> {post?.rUser?.phone}
          </a>
          <a
            href={`https://zalo.me/${post?.rUser?.phone}`}
            className="flex gap-2 items-center font-bold justify-center py-2 w-full rounded-md bg-orange-600 text-white"
          >
            <img
              src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png"
              alt=""
              className="w-6 object-contain"
            />{" "}
            {post?.rUser?.phone}
          </a>
        </div>
        <RelatedPosts title={`Cùng thể loại ${post?.rCatalog?.value}`}>
          <div className="flex flex-col">
            {relatedPost?.map((el) => (
              <RelatedCard key={el.id} el={el} />
            ))}
          </div>
        </RelatedPosts>
       
      </div>
    </div>
  )
}

export default DetailNew
