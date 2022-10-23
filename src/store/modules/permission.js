import { constantRoutes, userRoutes } from "@/router"
import { getToken } from "@/utils/auth"
const state = {
  routes: [],
  addRoutes: [],
  userRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_USER_ROUTES: (state, routes) => {
    state.userRoutes = userRoutes
  }
}

const actions = {

  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = []
      
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_USER_ROUTES', userRoutes)
      resolve(accessedRoutes)
    })
    // let res = []
    // for (let route of constantRoutes)
    //   if (!route.hidden) res.push(route)
    // commit('SET_ROUTES', res)
    // res = [];
    // commit('SET_USER_ROUTES', userRoutes)

  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

