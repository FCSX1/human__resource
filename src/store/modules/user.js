import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

// 状态
const state = {
  token: getToken(), // 设置token为共享状态  初始化vuex的时候 就先从缓存中读取token
  userInfo: {} // 这里定义一个空对象，因为我们会在getters中引用userInfo的变量，如果设置为null，则会引起异常和报错
}
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    setToken(token) // 同步给缓存
  },
  removeToken(state) {
    state.token = null // 将vuex的数据清空
    removeToken()
  },
  setUserInfo(state, result) {
    // state.userInfo['username'] = result 这样才不是响应式
    /* 更新一个对象 */
    state.userInfo = result // 这样是响应式
    // state.userInfo = { ...result } // 这样也是响应式 属于浅拷贝
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户的详情  用户的详情数据
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 提交到mutations
    return result // 这里为什么要return 是为了我们后期做权限的时候留下伏笔
  },
  // 登出操作
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
