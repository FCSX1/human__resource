import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 状态
const state = {
  token: getToken() // 设置token为共享状态  初始化vuex的时候 就先从缓存中读取token

}
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex的数据清空
    removeToken()
  }
}

const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data)
    // axios默认加了一层data
    if (result.data) {
      // 如果为true 标识登录成功
      context.commit('setToken', result.data.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
