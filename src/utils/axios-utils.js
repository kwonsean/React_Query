import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:4000' })
console.log('client', { client })

export const request = ({ ...options }) => {
  console.log('options', options)
  client.defaults.headers.common.Authorization = 'Bearer token'
  const onSuccess = (response) => {
    console.log('onSuccess res', response)
    return response
  }
  const onError = (error) => {
    //optinally catch errors and add additinal loggin here
    return error
  }
  return client(options).then(onSuccess).catch(onError)
}
