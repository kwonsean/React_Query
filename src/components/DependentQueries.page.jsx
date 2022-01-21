import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchContents = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

// TODO email을 통해 유저를 찾고 유저의 채널명을 통해 채널 정보를 찾아보자!
export default function DependentQueriesPage({ email }) {
  const { data: user, isSuccess } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  )
  const channelId = user?.data.channelId // user가 바로 있는게 아닙니다. 통신을 한 뒤에! data가 생길테니 ?로 에러를 예방

  // user통신을 하기 전에는 channelID가 undefined이다. 이때 useQuery하면 에러가 나겠죠? 그걸 예방하기 위해 enabled 옵션을 사용하여 undefined면 false로 하지 않다고 undefined가 풀리면 true로 통신을 시작하게 하여 에러를 예방한다. (이제 통신을 못 해도 에러가 아닌 idle상태)
  // isSuccess를 이용하여 앞에 통신이 성공하면 뒤에 useQuery가 실행되도록 코드를 짜봤는데 이건 오류가 난다. useQuery는 render될때 무조건 같이 실행되어야 한다고 경고가 나옴
  useQuery(['contents', channelId], () => fetchContents(channelId), {
    enabled: channelId === undefined ? false : true,
  })

  return <div>DependentQueriesPage</div>
}
