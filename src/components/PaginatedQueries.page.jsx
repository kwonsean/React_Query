import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

const fetchTotalColors = () => {
  return axios.get(`http://localhost:4000/colors`)
}

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=3&_page=${pageNumber}`)
}

export default function PaginatedQueriesPage() {
  const [pageNumber, setPageNumber] = useState(1)

  const { isSuccess, data: allColors } = useQuery(
    'total-colors',
    fetchTotalColors
  )

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true, // 페이지 이동시 이전 값이 계속 보여지다가 fetching이 끝나면 다음 데이터로 보여줌 (로딩 화면을 보여주지 않는 장점)
    }
  )
  // 마지막 페이지 계산을 위해 총 길이 확인
  // if (isSuccess) {
  //   console.log(Math.ceil(allColors.data.length / 3))
  // }

  if (isLoading) {
    return <h2>LOADING...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>PaginatedQueriesPage</h2>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h3>
                {color.id} - {color.label}
              </h3>
            </div>
          )
        })}
      </div>
      <button
        onClick={() => setPageNumber((page) => page - 1)}
        disabled={pageNumber === 1}
      >
        PREV
      </button>
      <button
        onClick={() => setPageNumber((page) => page + 1)}
        disabled={pageNumber === Math.ceil(allColors.data.length / 3)}
      >
        NEXT
      </button>
      <br />
      <span>{isFetching && 'Fetching...'}</span>
    </>
  )
}
