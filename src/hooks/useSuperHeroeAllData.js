import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'

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
  const queryClient = useQueryClient()
  return useQuery(['super-heroes', id], getAllSuperHeroesByKey, {
    // 그냥 호출 후 쿼리 키로 값 받기(앞에 작성한 배열)
    // 초기값을 지정할 수 있다 이때 함수로 작성하고 return은 객체형태로 data가 담긴 상태 그래서 로딩없이 바로 보여준다. 이미 있으니깐
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(id))
      if (hero) {
        return {
          data: hero,
        }
      } else {
        return undefined
      }
    },
  })
}
