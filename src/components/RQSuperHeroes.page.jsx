import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

const getAllSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export default function RQSuperHeroesPage() {
  // 성공 or 실패 했을때 다음으로 호출할 함수를 지정 가능하다.
  const onSuccess = (data) => {
    console.log('Perfrom side effect after data fetching', data)
  }
  const onError = (error) => {
    console.log('Perform side effect after encountering error', error)
  }

  // 3번째 인수로 cacheTime을 넣을 수 있는데 지정한 시간이 지나면 데이터가 사라진다. (기본값 5분)
  // 그래서 다시 이 페이지에 접속하면 다시 재로딩 된다.
  // 이외에도 여러 옵션을 넣을 수 있지만 보통 default값으로도 충분하다. (cacheTime도 굳이 수정안해도 됨)
  // https://react-query.tanstack.com/reference/useQuery
  const results = useQuery('super-heroes', getAllSuperHeroes, {
    cacheTime: 1000 * 60,
    // refetchInterval: 2000, // 2초마다 refetch함 (기본값 false)
    // refetchIntervalInBackground: true
    enabled: false,
    onSuccess,
    onError,
    // !! select는 data를 필터링하여 원하는 값만 data에 들어가도록 한다. (return 값이 data에 들어감 지금은 이름만 들어감)
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name)
    //   return superHeroNames
    // },
  })

  console.log('results', results)
  console.log('loading', results.isLoading, 'fetching', results.isFetching) // Loading은 한번 데이터를 가져오면 계속 fasle 반면 fetching은 매번 true로 바뀌었다 false로 바뀜

  if (results.isLoading || results.isFetching) return <h2>Loading...</h2>
  if (results.isError) return <h2>{results.error.message}</h2>

  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      <button onClick={results.refetch}>Fetch heroes data</button>
      {results.isSuccess
        ? results.data.data.map((hero) => (
            <div key={hero.id}>
              <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
            </div>
          ))
        : null}
      {/* {results.isSuccess
        ? results.data.map((hero, index) => <div key={index}>{hero}</div>)
        : null} */}
    </>
  )
}
