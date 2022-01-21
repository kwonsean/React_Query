import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes') // 여기선 리턴이 통신 결과 그 자체
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends').then((res) => res.data) // 여기선 리턴이 통신 결과 데이터!
}

// !! 두 함수의 리턴의 결과는 다른데 useQuery를 사용해서 사용할 메서드를 뽑을 때에는 상관없이 잘 작동한다.

export default function ParallelQueriesPage() {
  useQuery('super-heroes', fetchSuperHeroes)
  const { isLoading, data, isSuccess } = useQuery('friends', fetchFriends)
  console.log(isLoading, data, isSuccess)
  return <div>ParallelQueriesPage</div>
}
