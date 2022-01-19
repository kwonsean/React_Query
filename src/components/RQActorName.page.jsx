import React from 'react'
import { useSuperHeroesActorNameData } from '../hooks/useSuperHeroesActorNameData'

export default function RQActorNamePage() {
  const onSuccess = (data) => {
    console.log('Perfrom side effect after data fetching', data)
  }
  const onError = (error) => {
    console.log('Perform side effect after encountering error', error)
  }

  const results = useSuperHeroesActorNameData(onSuccess, onError)
  console.log(results)
  return (
    <>
      <h2>RQ Actor name</h2>

      {results.isSuccess
        ? results.data.map((hero, index) => <div key={index}>{hero}</div>)
        : null}
    </>
  )
}
