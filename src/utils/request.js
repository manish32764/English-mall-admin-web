import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

//Create an instance of axios
const service = axios.create({
baseURL: process.env.BASE_API,//base_url of api
timeout: 15000//Request timeout
})

//request interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
config.headers ['Authorization'] = getToken ()//Let each request carry a custom token according to the Modification of the actual situation
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

//respone interceptor
service.interceptors.response.use(
  response => {
  /**
* Code is not 200 error can be modified in conjunction with their own business
  */
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })

//401: not logged in;
      if (res.code === 401) {
MessageBox.confirm ('You have been logged out, you can cancel your stay on this page or log back in ', 'OK logout', {
confirmButtonText: 'Login agence',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
location.reload ()//Avoid bugs in order to re-instantiate vue-router objects
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
