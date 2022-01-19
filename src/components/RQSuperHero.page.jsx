import React from 'react'
import { useParams } from 'react-router-dom'
import { useSuperHeroeAllData } from '../hooks/useSuperHeroeAllData'

export default function RQSuperHeroPage() {
  const { heroId } = useParams()
  // console.log(heroId)
  const { isLoading, data, isError, error } = useSuperHeroeAllData(heroId)

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <h2>Super hero details</h2>
      {data?.data.name} - {data?.data.alterEgo}
    </>
  )
}
