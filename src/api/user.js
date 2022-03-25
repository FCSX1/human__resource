import request from '@/utils/request'

/* 登录接口的封装 */
export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data // 请求体参数  ES6写法变量名和参数名一致时可以简写
  })
}
/*
获取用户资料接口
*/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/*
根据用户id获取用户的详情
*/
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {
  return request({})
}
