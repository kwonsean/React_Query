import axios from 'axios'
import { useQuery } from 'react-query'

const getAllSuperHeroes = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`)
}

// 실제 적용 코드
const getAllSuperHeroesByKey = ({ queryKey }) => {
  console.log('queryKey', queryKey) // ['super-heroes', '3'] 홀리몰리.. 쿼리키를 받을 수 있다...
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

// export const useSuperHeroeAllData = (id) => {
//   return useQuery(['super-heroes', id], () => getAllSuperHeroes(id))
// id값 넣어주면서 axios실행을 해도되지만 더 우아한 방법이 있다..
// }

export const useSuperHeroeAllData = (id) => {
  return useQuery(['super-heroes', id], getAllSuperHeroesByKey) // 그냥 호출 후 쿼리 키로 값 받기(앞에 작성한 배열)
}
