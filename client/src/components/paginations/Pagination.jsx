import React from "react"
import PagItem from "./PagItem"
import { useSearchParams } from "react-router-dom"
import usePagination from "~/hooks/usePagination"

const Pagination = ({ totalCount = 0, limit = 1 }) => {
  const [params] = useSearchParams()
  const pagination = usePagination(totalCount, +params.get("page"), limit)

  const range = () => {
    const currentPage = +params.get("page")
    const pageSize = +limit
    const start = Math.min((currentPage - 1) * pageSize + 1, totalCount)
    const end = Math.min(currentPage * pageSize, totalCount)

    return `${start} - ${end}`
  }
  return (
    <div className="flex items-center justify-center lg:justify-end w-full px-4 my-4 italic">
      <div className="flex items-center gap-2">
        {pagination?.map((el) => (
          <PagItem key={el}>{el}</PagItem>
        ))}
      </div>
    </div>
  )
}

export default Pagination
