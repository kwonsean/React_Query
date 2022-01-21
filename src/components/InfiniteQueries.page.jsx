import axios from 'axios'
import React, { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'

const fetchTotalColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=3&_page=${pageParam}`)
}

export default function InfiniteQueriesPage() {
  const {
    isLoading,
    isError,
    error,
    data, // useInfiniteQuery에서는 data안에 모양이 다르다. (data가 아닌 pages가 있다.)
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
  } = useInfiniteQuery('colors', fetchTotalColors, {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 4) {
        // 하드코딩
        return pages.length + 1
      } else {
        return undefined
      }
    },
  })

  if (isSuccess) {
    console.log(data)
    console.log(data.pages)
  }

  if (isLoading) {
    return <h2>LOADING...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  // !! 아래코드에서 group은 데이터를 더 fetching하게되면 data안에 pages가 있고 그 pages에 limite 걸어둔 만큼의 데이터가 각 배열로 들어 있다. (3개) 따라서 그 배열들을 하나씩 들어가서 또 map을 돌면서 그려줘야 하기 때문에 2개의 map이 필요하다.
  return (
    <>
      <h2>InfiniteQueriesPage</h2>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} - {color.label}
                </h2>
              ))}
            </Fragment>
          )
        })}
      </div>
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load more
      </button>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}
