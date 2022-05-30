import axios from 'axios'
import { Toast } from 'vant'

const ip = "localhost"
const port = "3000"
const baseURL = `http://${ip}:${port}`

const AJAX_baseURL = process.env.NODE_ENV === "development" ? baseURL : ""


// 创建一个axios的对象
const instance = axios.create({
  baseURL: AJAX_baseURL, // baseURL会在发送请求的时候拼接url参数前面
  timeout: 10000,
  withCredentials: true // 携带用户凭证
})

// 请求拦截
// 所有的网络请求都会先走这个方法
instance.interceptors.request.use(
  function (config) {
    // const { url, method, params, data } = config
    // console.log(`${method}了${url}`, method === 'get' ? params : data)
    return config
  },
  function (err) {
    console.log('失败请求，错误为', err.message)
    return Promise.reject(err)
  }
)

// 响应拦截
// 所有的网络请求返回数据之后都会先执行此方法
instance.interceptors.response.use(
  function (response) {
    // console.log('响应成功', response)
    return response
  },
  function (error) {
    // console.log('响应失败，错误为', err.message)
    Toast('服务器错误！');
    // setTimeout(() => {
    //   window.location.replace(location.href)
    // }, 1000);
    console.log(error);
    return Promise.reject(error)
  }
)

export async function $get (url, params) {
  const { data } = await instance.get(url, { params })
  return data
}

export async function $post (url, params) {
  const { data } = await instance.post(url, params)
  return data
}

export default instance
