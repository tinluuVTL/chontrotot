import React, { useEffect, useState } from "react"
import { apiGetPosts } from "~/apis/post"
import { PostCard, NewCard,GhepCard } from "."
import { Pagiantion } from "../paginations"
import { useAppStore } from "~/store"
import { useLocation, useSearchParams } from "react-router-dom"

const List = ({ filters = {}, isHidePagination, tag, codeTag }) => {
  const [posts, setPosts] = useState()
  const { catalogs } = useAppStore()
  const [seachParams] = useSearchParams()
  const location = useLocation()
  const fetchPosts = async (params) => {
    if (location.pathname === tag) params.catalogId = codeTag
    const response = await apiGetPosts({
      limit: import.meta.env.VITE_LIMIT_POSTS,
      ...filters,
      ...params,
    })
    if (response.success) setPosts(response.posts)
  }
  useEffect(() => {
    const searchParamsObj = Object.fromEntries([...seachParams])
    if (searchParamsObj["gia-tu"] && !searchParamsObj["gia-den"]) {
      searchParamsObj.price = [searchParamsObj["gia-tu"]]
      delete searchParamsObj["gia-tu"]
    }
    if (searchParamsObj["gia-den"] && !searchParamsObj["gia-tu"]) {
      searchParamsObj.price = [0, searchParamsObj["gia-den"]]
      delete searchParamsObj["gia-den"]
    }
    if (searchParamsObj["gia-den"] && searchParamsObj["gia-tu"]) {
      searchParamsObj.price = [searchParamsObj["gia-tu"], searchParamsObj["gia-den"]]
      delete searchParamsObj["gia-den"]
      delete searchParamsObj["gia-tu"]
    }
    if (searchParamsObj["dien-tich-tu"] && !searchParamsObj["dien-tich-den"]) {
      searchParamsObj.area = [searchParamsObj["dien-tich-tu"]]
      delete searchParamsObj["dien-tich-tu"]
    }
    if (searchParamsObj["dien-tich-den"] && !searchParamsObj["dien-tich-tu"]) {
      searchParamsObj.area = [0, searchParamsObj["dien-tich-den"]]
      delete searchParamsObj["dien-tich-den"]
    }
    if (searchParamsObj["dien-tich-den"] && searchParamsObj["dien-tich-tu"]) {
      searchParamsObj.area = [searchParamsObj["dien-tich-tu"], searchParamsObj["dien-tich-den"]]
      delete searchParamsObj["dien-tich-den"]
      delete searchParamsObj["dien-tich-tu"]
    }
    fetchPosts(searchParamsObj)
  }, [seachParams])

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-1">
      {posts?.rows?.map((el) => {
  const bgCatalog = catalogs?.find((ctg) => ctg.id === el.rCatalog?.id)?.bg;

  if (el.rCatalog?.id === 5) {
    return <NewCard key={el.id} {...el} bgCatalog={bgCatalog} />;
  } else if (el.rCatalog?.id === 4) {
    return <GhepCard key={el.id} {...el} bgCatalog={bgCatalog} />;
  } else {
    return <PostCard key={el.id} {...el} bgCatalog={bgCatalog} />;
  }
})}
      </div>
      {!isHidePagination && <Pagiantion totalCount={posts?.count} limit={import.meta.env.VITE_LIMIT_POSTS} />}
    </div>
  )
}

export default List
