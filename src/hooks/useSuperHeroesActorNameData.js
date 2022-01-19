import axios from 'axios'
import { useQuery } from 'react-query'

const getAllSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const useSuperHeroesActorNameData = (onSuccess, onError) => {
  return useQuery('super-heroes-actor', getAllSuperHeroes, {
    onSuccess,
    onError,
    select: (data) => {
      const superHeroActorNames = data.data.map((hero) => hero.alterEgo)
      return superHeroActorNames
    },
  })
}
