import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const getAllSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export default function RQSuperHeroesPage() {
  const results = useQuery('super-heroes', getAllSuperHeroes)
  console.log('results', results)

  if (results.isLoading) return <h2>Loading...</h2>
  if (results.isError) return <h2>{results.error.message}</h2>

  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      {results.isSuccess
        ? results.data.data.map((hero) => <div key={hero.id}>{hero.name}</div>)
        : null}
    </>
  )
}
