import axios from 'axios'
// import { Message } from 'element-ui'
const service = axios.create({
  // 当执行 npm run dev => .evn.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, //  npm run dev => /api npm run build /prod-pai
  timeout: 5000 // 设置超时时间
})

// // 响应拦截器
// service.interceptors.request.use(response => {
//   // axios默认加了一层data
//   const { success, message, data } = response.data
//   // 要根据success的成功与否决定下面的操作
//   if (success) {
//     return data
//   } else {
//     Message.error(message) // 提示错误消息
//     return Promise.reject(new Error(message))
//   }
// }, error => {
//   Message.error(error.message) // 提示错误信息
//   return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
// })

export default service
