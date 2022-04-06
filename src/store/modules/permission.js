// 专门处理权限路由的模块
import { constantRoutes } from '@/router'
const state = {
  // 一开始 肯定拥有静态路由的权限
  routes: constantRoutes // 路由表 表示 当前用户所拥有的所有路由的数组
}
const mutations = {
  // 定义修改router的mutations
  // payload 认为是我们登录成功需要添加的新路由
  setRoutes(state, newRoutes) {
    // 这么写业务不太正确  state.routes = [...state.routes,...newRoutes]
    state.routes = [...constantRoutes, ...newRoutes] // 每次都是在静态路由的基础上去加新的路由
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
